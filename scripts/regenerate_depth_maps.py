import os
import glob
import shutil
import sys
from gradio_client import Client, handle_file

def regenerate_depth_maps(directory):
    if not os.path.exists(directory):
        print(f"Target directory does not exist: {directory}")
        return

    # 1. Delete all existing _depth.png files
    depth_files = glob.glob(os.path.join(directory, "*_depth.png"))
    if depth_files:
        print(f"Deleting {len(depth_files)} existing depth maps in {directory}...")
        for df in depth_files:
            try:
                os.remove(df)
                print(f"  -> Deleted {os.path.basename(df)}")
            except Exception as e:
                print(f"  -> Failed to delete {os.path.basename(df)}: {e}")
    else:
        print(f"No existing depth maps found to delete in {directory}.")

    # 2. Connect to Gradio server
    print("\nConnecting to DA2 Gradio server at http://192.168.0.100:6381/ ...")
    try:
        client = Client("http://192.168.0.100:6381/")
    except Exception as e:
        print(f"Failed to connect to the server: {e}")
        return

    # 3. Find all base png/jpg files
    extensions = ["*.png", "*.jpg", "*.jpeg"]
    img_files = []
    for ext in extensions:
        img_files.extend(glob.glob(os.path.join(directory, ext)))
        
    img_files = [f for f in img_files if not f.endswith("_depth.png")]
    
    if not img_files:
        print("No source image files found to process.")
        return

    print(f"\nRegenerating depth maps for {len(img_files)} images...")
    for img_file in img_files:
        output_file = os.path.splitext(img_file)[0] + "_depth.png"
        # If output filename ends up mapping differently based on specific overrides, handle standard pattern
        if "classroom-color" in img_file:
            output_file = os.path.join(directory, "classroom-depth-3k.png")
        elif "studio-color" in img_file:
            output_file = os.path.join(directory, "studio-da2-2K.png")
        elif "bedroom-color" in img_file:
            output_file = os.path.join(directory, "bedroom-da2-3K.png")
            
        print(f"Processing {os.path.basename(img_file)}...")
        
        try:
            result = client.predict(
                image_path=handle_file(img_file),
                mask_path=None,
                api_name="/predict"
            )
            
            packed_depth_map_path = result[2]
            shutil.copy2(packed_depth_map_path, output_file)
            print(f"  -> Successfully generated {os.path.basename(output_file)}")
            
        except Exception as e:
            print(f"  -> Failed to process {os.path.basename(img_file)}: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Allow passing target folder, default to public/samples-2k
    if len(sys.argv) > 1:
        target_dir = os.path.abspath(sys.argv[1])
    else:
        target_dir = os.path.join(os.path.dirname(script_dir), "public", "samples")
        
    regenerate_depth_maps(target_dir)
