# 甜點電商 (以 Boostrap 排版)
> 這是 Bootstrap 框架整合練習
> 練習設計稿來自 [六角學院 - Bootstrap 4 - 開發超強不解釋](https://www.hexschool.com/bootstrap/)

## DEMO
https://albertnotes.github.io/bootstrap-demo/

## 功能
- 純粹運用 Bootstrap 整合切版

## 使用技術
-  Sass
-  gulp
-  Bootstrap CSS
-  Material icons 

## 安裝與執行

``` 
# Clone 專案
git clone git@github.com:Albertnotes/bootstrap-demo.git

# cd 專案資料夾 - 安裝環境 
npm install gulp -g

# 執行
npm install
gulp

# 其他指令
gulp build # 生成靜態網頁（未壓縮）預設 --env development 可省略
gulp build --env production # 生成靜態網頁（壓縮 CSS）
gulp deploy # 將靜態網頁佈署到 gh-pages

# 本專案 gulp 任務模組沒有加入圖片壓縮
# 因為第三方應用程式壓縮率大於套件
```
