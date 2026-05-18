import os
import glob
import shutil
import sys
from gradio_client import Client, handle_file

def regenerate_cubemaps(source_directory, dest_directory):
    if not os.path.exists(source_directory):
        print(f"Source directory does not exist: {source_directory}")
        return

    os.makedirs(dest_directory, exist_ok=True)

    # Connect to Gradio server
    print("\nConnecting to DA2 Gradio server at http://192.168.0.100:6381/ ...")
    try:
        client = Client("http://192.168.0.100:6381/")
    except Exception as e:
        print(f"Failed to connect to the server: {e}")
        return

    # Find all base png/jpg files
    extensions = ["*.png", "*.jpg", "*.jpeg"]
    img_files = []
    for ext in extensions:
        img_files.extend(glob.glob(os.path.join(source_directory, ext)))
        
    img_files = [f for f in img_files if not f.endswith("_depth.png")]
    
    if not img_files:
        print("No source image files found to process.")
        return

    print(f"\nRegenerating cubemaps for {len(img_files)} images...")
    for img_file in img_files:
        basename = os.path.splitext(os.path.basename(img_file))[0]
        env_dest_dir = os.path.join(dest_directory, basename)
        os.makedirs(env_dest_dir, exist_ok=True)

        print(f"Processing {os.path.basename(img_file)}...")
        
        try:
            result = client.predict(
                image_path=handle_file(img_file),
                api_name="/predict"
            )
            
            # result[2] contains the list of cubemap files (color and depth)
            cubemap_files = result[2]
            for f in cubemap_files:
                f_path = f if isinstance(f, str) else f.get('filepath') or f.get('path') or f.get('name')
                
                # The server might return a zip file as the first element; skip it
                if f_path.endswith('.zip'):
                    continue

                orig_name = os.path.basename(f_path)
                
                # Standardize names
                parts = ["color_px", "color_nx", "color_py", "color_ny", "color_pz", "color_nz",
                         "depth_packed_px", "depth_packed_nx", "depth_packed_py", "depth_packed_ny", "depth_packed_pz", "depth_packed_nz"]
                
                new_name = orig_name
                for part in parts:
                    if part in orig_name:
                        new_name = f"{part}.png"
                        break
                        
                dest_file = os.path.join(env_dest_dir, new_name)
                shutil.copy2(f_path, dest_file)
                
            print(f"  -> Successfully generated cubemaps for {basename}")
            
        except Exception as e:
            print(f"  -> Failed to process {os.path.basename(img_file)}: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    source_dir = os.path.join(os.path.dirname(script_dir), "public", "samples")
    dest_dir = os.path.join(os.path.dirname(script_dir), "public", "cubemaps")
    regenerate_cubemaps(source_dir, dest_dir)
