import os
import cv2
import numpy as np
import py360convert
from PIL import Image

def process():
    input_path = 'public/samples/classroom_3k_depth.png'
    output_dir = 'public/cubemaps/classroom_3k/'
    
    print(f"Reading {input_path}...")
    # Read as an unchanged image to preserve EXACT values
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    
    if img is None:
        print("Failed to read image")
        return
        
    print(f"Image shape: {img.shape}")
    
    h, w = img.shape[:2]
    face_w = w // 4
    
    print(f"Converting to cubemap with face width {face_w}, mode='nearest'...")
    # For packed depth maps, mode='nearest' is absolutely critical to prevent interpolation corrupting the high/low bytes.
    cubemap_dict = py360convert.e2c(img, face_w=face_w, mode='nearest', cube_format='dict')
    
    face_map = {'R': 'px', 'L': 'nx', 'U': 'py', 'D': 'ny', 'F': 'pz', 'B': 'nz'}
    
    os.makedirs(output_dir, exist_ok=True)
    
    for face_key, face_name in face_map.items():
        face_img = cubemap_dict[face_key]
        out_path = os.path.join(output_dir, f'depth_packed_{face_name}.png')
        print(f"Saving {out_path}...")
        # Save preserving the same format
        cv2.imwrite(out_path, face_img)
        
    print("Done!")

if __name__ == '__main__':
    process()
