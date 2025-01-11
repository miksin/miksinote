---
title: 'CloudFlare R2を使ったブログ画像ホスティング'
date: 2024-12-27
---

# CloudFlare R2を使ったブログ画像ホスティング

> AI生成の要約

<!-- excerpt -->

この記事では、CloudFlare R2をブログ画像ホスティングサービスとして使用する方法を紹介します。画像をWebP形式に変換する手順、バケットの作成、カスタムドメインの設定、rcloneを使用した画像のアップロード、関連ツールのインストールおよび設定ガイドを含みます。

<!-- excerpt -->

[[toc]]

この記事は主に[この投稿](https://ivonblog.com/posts/cloudflare-r2-image-hosting/)に基づいています。

## 画像をWebPに変換する

画像を正式にアップロードする前に、WebP形式に変換します。

### webpのインストール

#### Mac

```bash
brew install webp
```

#### Ubuntu

```bash
sudo apt install webp
```

### 画像ファイルをWebPに変換する

特定のPNGファイルをWebPに変換する

```bash
cwebp -q 80 input.png -o output.webp
```

または、ディレクトリ内のすべてのPNGファイルを変換するために`png_to_webp.sh`を作成します

```bash
#!/bin/bash

# PNGファイルを含むディレクトリ
input_dir=$1

# WebP変換の品質
quality=80

# 入力ディレクトリが提供されているか確認
if [ -z "$input_dir" ]; then
  echo "Usage: $0 <input_directory>"
  exit 1
fi

# ディレクトリ内の各PNGファイルをWebPに変換
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

## CloudFlare R2の使用を開始する

### 前提条件

- カスタムドメインがCloudFlareでホストされていること

### バケットを作成する

CloudFlareダッシュボードに移動し、左側のサイドバーからR2ページに移動します。

`Create Bucket`をクリックします。

![r2_overview.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_overview.webp)

バケット名を入力し、新しいバケットを作成します。

![r2_create_bucket.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_create_bucket.webp)

設定でカスタムドメインを指定します。

![r2_custom_domain.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_custom_domain.webp)

少し待った後、ブラウザから直接ページにアクセスしてみてください。404エラーが表示された場合、セットアップは成功です。

![r2_cdn_404.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_cdn_404.webp)

## rcloneを使用してR2を操作する

R2のWebインターフェースを使用してファイルをアップロードすることもできますが、あまり便利ではなく、フォルダを作成することもできません。そのため、`rclone`を使用して操作します。

### R2 APIトークンを取得する

概要画面に戻り、右側の`Manage R2 API Tokens`をクリックし、`Create API Token`を選択します。

![r2_manage_api.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_manage_api.webp)

設定ページで`Object Read & Write`を選択します。

![r2_api_permission.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_api_permission.webp)

すべてのバケットを操作するか、`Apply to specific buckets only`を選択して特定のバケットを指定することができます。

確認後、`access key id`などの情報が表示されます。このページを閉じないでください、後で必要になります。

### rcloneのインストール

#### Mac

```bash
brew install rclone
```

#### Ubuntu

[公式ドキュメント](https://rclone.org/install/#linux)を参考

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

### rclone.confの設定

`~/.config/rclone/rclone.conf`を編集し、R2 APIトークンページから取得した情報を入力します。

```
[cloudflarer2]
type = s3
provider = Cloudflare
access_key_id =
secret_access_key =
endpoint =
acl = private
```

### 特定のパスに画像をアップロードする

このフォルダ内のすべてのファイルをこの記事の画像配置場所`/miksinote/img/notes/cloudflare/r2_img_hosting/`にアップロードします。

```bash
rclone copy -v . cloudflarer2:/cdn/miksinote/img/notes/cloudflare/r2_img_hosting/
```

結果を確認するには`ls`を使用します。

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

その後、パスを`.md`ファイルに挿入できます。

```markdown
![r2_api_permission.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/r2_img_hosting/r2_api_permission.webp)
```

完了！

## References

- [Rclone](https://rclone.org/)
- [rclone · Cloudflare R2 docs](https://developers.cloudflare.com/r2/examples/rclone/)
- [架設Cloudflare R2免費圖床，給Hugo靜態網站託管圖片](https://ivonblog.com/posts/cloudflare-r2-image-hosting/)
- [提升網站速度的關鍵：如何使用 cwebp 將圖片轉換成 WebP 格式](https://ooorito.com/blog-webp-image-format-cwebp-install-guide/)
