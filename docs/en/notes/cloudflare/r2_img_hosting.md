---
title: 'Using CloudFlare R2 for Blog Image Hosting'
date: 2024-12-27
---

# Using CloudFlare R2 for Blog Image Hosting

> AI-generated summary

<!-- excerpt -->

This article introduces how to use CloudFlare R2 as a blog image hosting service, including steps to convert images to webp format, create a bucket, set up a custom domain, upload images using rclone, and provides installation and configuration guides for related tools.

<!-- excerpt -->

[[toc]]

This article is mainly based on [this post](https://ivonblog.com/posts/cloudflare-r2-image-hosting/).

## Convert Images to WebP

Before officially uploading images, convert them to WebP format.

### Install webp

#### Mac

```bash
brew install webp
```

#### Ubuntu

```bash
sudo apt install webp
```

### Convert Image Files to WebP

Convert a specific PNG file to WebP

```bash
cwebp -q 80 input.png -o output.webp
```

Or convert all PNG files in a directory by creating `png_to_webp.sh`

```bash
#!/bin/bash

# Directory containing PNG files
input_dir=$1

# Quality for WebP conversion
quality=80

# Check if input directory is provided
if [ -z "$input_dir" ]; then
  echo "Usage: $0 <input_directory>"
  exit 1
fi

# Convert each PNG file in the directory to WebP
for file in "$input_dir"/*.png;
do
  if [ -f "$file" ]; then
    output_file="${file%.png}.webp"
    cwebp -q $quality "$file" -o "$output_file"
    echo "Converted $file to $output_file"
  fi
done
```

```bash
chmod +x png_to_webp.sh
./png_to_webp.sh /path/to/png/files
```

## Start Using CloudFlare R2

### Prerequisite

- Custom domain must be hosted by CloudFlare

### Create a Bucket

Go to the CloudFlare dashboard and navigate to the R2 page from the left sidebar.

Click `Create Bucket`.

![r2_overview.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_overview.webp)

Enter the bucket name and create a new bucket.

![r2_create_bucket.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_create_bucket.webp)

Specify the custom domain in the settings.

![r2_custom_domain.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_custom_domain.webp)

After a short wait, you can try accessing the page directly from the browser at `https://cdn.miksin.art/`. If you see a 404 error, it means the setup was successful.

![r2_cdn_404.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_cdn_404.webp)

## Use rclone to Operate R2

Although you can upload files using the R2 web interface, it is not very convenient, and you cannot even create folders. Therefore, use `rclone` to operate.

### Obtain R2 API Token

Go back to the overview screen, click `Manage R2 API Tokens` on the right, and select `Create API Token`.

![r2_manage_api.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_manage_api.webp)

In the settings page, select `Object Read & Write`.

![r2_api_permission.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_api_permission.webp)

You can choose to operate all buckets or specify a particular bucket by selecting `Apply to specific buckets only`.

After confirming, you will get information such as `access key id`. Do not close the page yet, as you will need it later.

### Install rclone

#### Mac

```bash
brew install rclone
```

#### Ubuntu

See [official document](https://rclone.org/install/#linux)

##### Fetch and unpack

```bash
curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64
```

##### Copy binary file

```bash
sudo cp rclone /usr/bin/
sudo chown root:root /usr/bin/rclone
sudo chmod 755 /usr/bin/rclone
```

##### Install manpage

```bash
sudo mkdir -p /usr/local/share/man/man1
sudo cp rclone.1 /usr/local/share/man/man1/
sudo mandb
```

### Configure rclone.conf

Edit `~/.config/rclone/rclone.conf` and fill in the information obtained from the R2 API Token page.

```
[cloudflarer2]
type = s3
provider = Cloudflare
access_key_id =
secret_access_key =
endpoint =
acl = private
```

### Upload Images to a Specific Path

Upload all files in this folder to the image placement location for this article `/miksinote/img/notes/cloudflare/r2_img_hosting/`.

```bash
rclone copy -v . cloudflarer2:/cdn/miksinote/img/notes/cloudflare/r2_img_hosting/
```

You can use `ls` to check the result.

```bash
rclone ls cloudflarer2:/cdn
```

```
31806 miksinote/img/notes/cloudflare/r2_img_hosting/r2_api_permission.webp
25092 miksinote/img/notes/cloudflare/r2_img_hosting/r2_cdn_404.webp
39440 miksinote/img/notes/cloudflare/r2_img_hosting/r2_create_bucket.webp
11374 miksinote/img/notes/cloudflare/r2_img_hosting/r2_custom_domain.webp
 9970 miksinote/img/notes/cloudflare/r2_img_hosting/r2_manage_api.webp
```

Then you can insert the path into the `.md` file.

```markdown
![r2_api_permission.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_api_permission.webp)
```

Done!

## References

- [Rclone](https://rclone.org/)
- [rclone · Cloudflare R2 docs](https://developers.cloudflare.com/r2/examples/rclone/)
- [架設Cloudflare R2免費圖床，給Hugo靜態網站託管圖片](https://ivonblog.com/posts/cloudflare-r2-image-hosting/)
- [提升網站速度的關鍵：如何使用 cwebp 將圖片轉換成 WebP 格式](https://ooorito.com/blog-webp-image-format-cwebp-install-guide/)
