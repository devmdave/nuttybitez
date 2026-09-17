import os
import shutil

public_dir = os.path.join(os.getcwd(), 'public', 'assets')
os.makedirs(public_dir, exist_ok=True)

file_map = {
    'logo.jpeg': 'logo.jpeg',
    'all packagings.jpeg': 'all_packagings.jpeg',
    'original theme poster.jpeg': 'original_theme_poster.jpeg',
    'packaging poster.jpeg': 'coffee_tiramisu_poster.jpeg',
    'packaging poster 2.jpeg': 'paan_shot_poster.jpeg',
    'packaging poster 3.jpeg': 'peri_peri_poster.jpeg'
}

for src, dest in file_map.items():
    if os.path.exists(src):
        shutil.copy(src, os.path.join(public_dir, dest))
        print(f"Copied {src} -> {dest}")

artifact_dir = r"C:\Users\davem\.gemini\antigravity-ide\brain\f1cd0397-bdc1-4d42-b263-140461eb2745"
if os.path.exists(artifact_dir):
    for f in os.listdir(artifact_dir):
        if f.endswith('.png') or f.endswith('.jpg') or f.endswith('.jpeg'):
            shutil.copy(os.path.join(artifact_dir, f), os.path.join(public_dir, f))
            print(f"Copied artifact {f}")
