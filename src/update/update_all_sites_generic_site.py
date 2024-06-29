import os
import shutil

GENERIC_SITE_PATH = 'E:\\CRM\\Firebase\\genericsite'
TARGET_BASE_PATH = 'E:\\CRM\\Firebase\\sites'

def get_existing_sites():
    try:
        sites = [name for name in os.listdir(TARGET_BASE_PATH) if os.path.isdir(os.path.join(TARGET_BASE_PATH, name))]
        return sites
    except Exception as e:
        print(f"An error occurred while listing the sites: {e}")
        return []

def copy_project_files(src, dest):
    files_and_dirs = [
        '.next',
        'src',
        'next.config.js',
        'package-lock.json',
        'package.json',
        'public/staticImages'
    ]
    for item in files_and_dirs:
        s = os.path.join(src, item)
        d = os.path.join(dest, item)

        # Skip copying the specific file
        if s == os.path.join(GENERIC_SITE_PATH, 'src', 'styles', 'colors.css'):
            continue

        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d)
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)


def update_all_sites():
    sites = get_existing_sites()
    for site in sites:
        site_path = os.path.join(TARGET_BASE_PATH, site)
        print(f"Updating site: {site_path}")
        copy_project_files(GENERIC_SITE_PATH, site_path)
        print(f"Files updated for site: {site_path}")

if __name__ == "__main__":
    update_all_sites()
