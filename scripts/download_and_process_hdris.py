import os

# Enable EXR support in OpenCV BEFORE importing cv2
os.environ["OPENCV_IO_ENABLE_OPENEXR"] = "1"

import urllib.request
import cv2
import numpy as np
import shutil
from gradio_client import Client, handle_file

def process_images(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    
    names = [
        "bathroom",
        "bell_tower",
        "christmas_photo_studio_04",
        "empty_play_room",
        "lebombo",
        "mirrored_hall",
        "modern_bathroom",
        "reading_room",
        "relax_inn_seaview_suite",
        "sepulchral_chapel_rotunda",
        "small_empty_room_1"
    ]
    
    print("Connecting to DA2 Gradio server at http://192.168.0.100:6381/ ...")
    try:
        gradio_client = Client("http://192.168.0.100:6381/")
    except Exception as e:
        print(f"Failed to connect to the DA2 server: {e}")
        gradio_client = None

    for name in names:
        # Defaulting to 4k source downscaled/labeled as 2k as per current setup
        base_name_dl = f"{name}_4k"
        base_name_out = f"{name}_2k"
        exr_url = f"https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/{base_name_dl}.exr"
        
        exr_file = os.path.join(output_dir, f"{base_name_out}.exr")
        png_file = os.path.join(output_dir, f"{base_name_out}.png")
        depth_file = os.path.join(output_dir, f"{base_name_out}_depth.png")
        
        # 1. Download EXR if it doesn't exist
        if not os.path.exists(exr_file) and not os.path.exists(png_file):
            print(f"Downloading {base_name_dl}.exr ...")
            try:
                urllib.request.urlretrieve(exr_url, exr_file)
            except Exception as e:
                print(f"  -> Failed to download {exr_url}: {e}")
                continue

        # 2. Convert EXR to PNG if it doesn't exist
        if os.path.exists(exr_file) and not os.path.exists(png_file):
            print(f"Converting {base_name_out}.exr to PNG ...")
            img = cv2.imread(exr_file, cv2.IMREAD_ANYCOLOR | cv2.IMREAD_ANYDEPTH)
            if img is None:
                print(f"  -> Failed to load {exr_file} with OpenCV")
                continue
            
            img_gamma_corrected = np.power(np.clip(img, 0, None), 1.0 / 2.2)
            img_8bit = np.clip(img_gamma_corrected * 255.0, 0, 255).astype(np.uint8)
            cv2.imwrite(png_file, img_8bit)
            
        # 3. Generate Depth Map if it doesn't exist
        if not os.path.exists(depth_file) and os.path.exists(png_file):
            if gradio_client is None:
                print("  -> Skipping depth generation, Gradio client not connected.")
                continue
                
            print(f"Generating depth map for {base_name_out}.png ...")
            try:
                result = gradio_client.predict(
                    image_path=handle_file(png_file),
                    mask_path=None,
                    api_name="/predict"
                )
                packed_depth_map_path = result[2]
                shutil.copy2(packed_depth_map_path, depth_file)
            except Exception as e:
                print(f"  -> Failed to generate depth map: {e}")
            
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_dir = os.path.join(os.path.dirname(script_dir), "public", "samples")
    process_images(target_dir)
