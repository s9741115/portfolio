---
title: NEWOIL 3 
description: 類似 Wordpress 的快速架站系統，讓公司客人可以在短時間內完成快速架站
header: https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/newoil3/newoil3_1.png
type: ISB
tags:
  - Laravel
  - Vue2
  - Docker
createdAt: 2023-03-11T13:32:52.449Z
---

NEWOIL 3 是一套類似 Wordpress 的快速架站系統，其目的是讓公司客人可以在短時間內快速擁有一個網站

這套系統我覺得非常吃行業經驗，也是我開發過最難，最有成就的系統

以下將會舉一個例子來說明這套系統的核心思維

### 環境背景

我所任職的公司是一間 **乙方** 接案公司，在我入職時已有了 **2xx** 個專案
但大量的專案導致維護成本非常高，再加上人力稀少
於是我被指派了這個任務，其目的是降低維護成本，同時又可以符合客人種種需求

### 假設情境

有 5 位客戶 A、B、C、D、E

### 需求

聯絡我們

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/newoil3/contact-us.png"></smart-figure>

* A 客戶
  * 姓名，電話，信箱
* B 客戶
  * 姓名，內容，信箱，Fax
* C 客戶
  * 電話，從何得知我們，性別

### 開發與思考的過程

一開始遇到這種問題，很直覺的設計是把所有的欄位都 **聯集** 起來再透過開關來去控制
但隨之而來的客人數量越來越多，資料庫欄位還有開關也越來越多

**因為**

舊的客人上線，要新增一個欄位 ( Add migration )，得花時間去處理
新客人有新欄位需求，舊的客人也要一併新增，因為要符合 **批量更新（ 核心一 ）**

經歷過幾位客戶之後，為了解決這問題，所以思考過決定改成使用 **動態建立表單** 的方式來解決，而從這簡單需求也衍生這套系統的另一層思考方向
必須把維度拉高，我自己常稱做 **抽象思維（ 核心二 ）**

### 什麼是『 批量更新 』，以及為什麼

批量更新的定義是當有新功能，或有 bug 的時候，一次把所有的站（ n 個客戶 ）都一起更新，

以下舉幾個小 🌰 

#### `例子一：寄信`

一開始我們本來使用 某C 廠商，但突然有一天 某C 廠商的帳號被鎖住，或者是公司需求要更換成 某E 廠商，

又或者是本來寄信的 title 是 
您有一封新信件 
要改成 
您有一封新聯絡我們信件 ....等，是需要動到程式碼的部分。

在這間公司幾乎所有的網站都需要寄信，這時候批量更新就派上用場，**只要確保程式碼是一致的 ( 同一個 git repo )**
就可以在短短的 10 分鐘更新將近 57 個網站（ 真實案例跟數字 ）

#### `例子二：文章上架時間`

有一天 D 客人突然希望文章可以有上架時間的需求

又有一天 E 客人突然希望文章可以自定義排序的順序

但如果客人越來越多呢？每個客人都有不一樣的邏輯跟做法這樣不就造成很多的維護成本嗎？

所以如果可以讓 D 客人跟 E 客人都同時有這三個欄位，我把需求統一了，不就會大大降低維護成本了嗎？

只要統一對一個邏輯，統一對一個 git 專案，就可以達到好維護的目的

也許做法對於 D 客人來說有排序的需求是他不需要的，對於 E 來說上架時間也是他不需要的

但因為在乙方公司，權衡之下我還是採用這種做法

因為真實世界上不是只有 5 家客戶，而是擁有 6x 家客戶（ 以我當前寫文章的時間來說 ），未來只會有更多的客戶出現

所以經過這麼多客戶這麼多的需求，我會把所有的需求整理出來，只維護一個 git 專案，如果今天有新客人有新需求

我就會把舊的客人也一併更新，當有 bug 也是一起更新，當然有 bug 一起更新也會一起出問題 XD

所以把一堆客人（ 批量 ）一起更新，就叫做 批量更新 XD.

但也許有你會思考，那怎麼不一開始就把所有的需求整理好就知道了呢？

我覺得不太可能，因為需求是真的要經歷一輪經驗才會知道，你真正能調查的有限

比如以文章來說可以有這麼多的功能

* 顯示在首頁
* 根據創建時間排序
* 根據更新時間排序
* 自定義排序
* 上架開始結束時間
* 文章的 tag
* 在中文語系不顯示，在英文語系顯示
* 熱門文章
* 自定義 slug
* 點擊文章不跳底層頁面，另開外部連結
* 文章上面的 banner 可以客製化

我是覺得不太可能一次就全部想到呀

### 那什麼是『 抽象思維 』

以上面聯絡我們的例子來說，抽一層思維上去，想到每個客人都有可能是不一樣的欄位，用什麼樣的方法來設計可以在同一份 git 專案

但同時又可以符合客種不一樣的需求，這就是『 抽象思維 』

所以聯絡我們最終長這樣

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/newoil3/dynamic-contact-us-1.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/newoil3/dynamic-contact-us-2.png"></smart-figure>

### 那目前這系統有以下功能

* 22 種語系，後台開關設定 
* 角色權限 ( 權限細到欄位，有 226 個 )
* 無限層 多語系 的 類別 ＆ 頁面
* 無限層 多語系 的 產品類別 ＆ 產品
* 會員
  - 三方登入
  - 審核機制
  - 會員等級
  - 會員動態註冊欄位
* 行銷管理
  - 優惠卷
* 表單管理
	* 條件發送
  * 動態表單設定
  * 表單群組
* SEO 自動化
	* 每個頁面的自動化產生 JsonLD
	* 一鍵開關上下架 SEO
* 多語系 banner
* UI
  * 切換主題

### Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ch_4foZpy8o?si=aOf4NrmP0AdLMm9u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 技術

在這系統我負責 Server 以及 後端還有後台，每個專案都是前後分離

* 後端
	- Laravel
	- Custom composer package 

* Server
  - Laradock
  - Redis
  - Mysql

* 後台
  - vue2
  - vue-router
  - vuex
  - vue-i18n
  - [Ag-grid](https://www.ag-grid.com/)
  - [Tinymce](https://www.tiny.cloud/)
  - [Filebrowser](https://github.com/filebrowser/filebrowser)

* Monitoring
  - [Uptime-Kuma](https://github.com/louislam/uptime-kuma)

### 相關技術文章

  - [Mail 的三兩事，包含源碼、SPF、DKIM 跟 DMARC 的一些看法](https://tasb00429.medium.com/mail-%E7%9A%84%E4%B8%89%E5%85%A9%E4%BA%8B-%E5%8C%85%E5%90%AB%E6%BA%90%E7%A2%BC-spf-dkim-%E8%B7%9F-dmarc-%E7%9A%84%E4%B8%80%E4%BA%9B%E7%9C%8B%E6%B3%95-fbe14bf849c7)
  - [Recursive SQL ( CTE )](https://tasb00429.medium.com/recursive-sql-cte-10f829369b1e)
  - [Certbot 更新失效的解決過程](https://tasb00429.medium.com/certbot-%E6%9B%B4%E6%96%B0%E5%A4%B1%E6%95%88%E7%9A%84%E8%A7%A3%E6%B1%BA%E9%81%8E%E7%A8%8B-162f1654fe1a)
  - [OAuth2 Authentation Facebook Login Laravel — Part 1](https://tasb00429.medium.com/oauth2-authentation-facebook-login-laravel-part-1-a2a29d74371f)
  - [OAuth2 Authentation Google Login Laravel — Part 2](https://tasb00429.medium.com/oauth2-authentation-google-login-laravel-part-2-c8e2a8406abf)
  - [OAuth2 Authentation Line Login Laravel — Part 3](https://tasb00429.medium.com/oauth2-authentation-line-login-laravel-part-3-4e17d4de1d3b)
  - [Step by Step! Building a package for the Laravel project](https://tasb00429.medium.com/step-by-step-building-a-package-for-the-laravel-project-ee3604bbbe82)
  - [About Cloudflare proxy status and Let’s encrypt and too many redirects error](https://tasb00429.medium.com/about-cloudflare-proxy-status-and-lets-encrypt-7539c516565c)
  - [關於刪除後台使用者](https://tasb00429.medium.com/%E9%97%9C%E6%96%BC%E5%88%AA%E9%99%A4%E5%BE%8C%E5%8F%B0%E4%BD%BF%E7%94%A8%E8%80%85-9fa1b5eefdbd)
  - [Linux Find command 刪除一個月沒存取的檔案](https://tasb00429.medium.com/find-command-%E5%88%AA%E9%99%A4%E4%B8%80%E5%80%8B%E6%9C%88%E6%B2%92%E5%AD%98%E5%8F%96%E7%9A%84-file-%E6%88%96%E8%80%85-directory-975645bee20c)
  - [初探 snaps 以及透過 snaps 來安裝 certbot](https://tasb00429.medium.com/%E5%88%9D%E6%8E%A2-snaps-%E4%BB%A5%E5%8F%8A%E9%80%8F%E9%81%8E-snaps-%E4%BE%86%E5%AE%89%E8%A3%9D-certbot-a04119496148)
  - [改用 SSH 連接遠端資料庫](https://tasb00429.medium.com/%E6%94%B9%E7%94%A8-ssh-%E9%80%A3%E6%8E%A5%E9%81%A0%E7%AB%AF%E8%B3%87%E6%96%99%E5%BA%AB-6a5887e3b668)
  - [Laravel 使用 Http Cache ETag, If-None-Match 與 Redis 應用](https://tasb00429.medium.com/laravel-%E4%BD%BF%E7%94%A8-http-cache-etag-if-none-match-%E8%88%87-redis-%E6%87%89%E7%94%A8-9cd89a21b4fa)
  - [用 Laravel request validation 來驗證複雜的活動時間](https://tasb00429.medium.com/%E7%94%A8-laravel-request-validation-%E4%BE%86%E9%A9%97%E8%AD%89%E8%A4%87%E9%9B%9C%E7%9A%84%E6%B4%BB%E5%8B%95%E6%99%82%E9%96%93-54a48fe6c7c)
  - [2020 從 iOS 轉職後端工程師半年的心得](https://tasb00429.medium.com/2020-%E8%BD%89%E8%81%B7%E5%BE%8C%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%AB%E5%8D%8A%E5%B9%B4%E7%9A%84%E5%BF%83%E5%BE%97-7bc0d1641031)
  - [Ubuntu 使用 NTP 校準時間](https://tasb00429.medium.com/ubuntu-%E4%BD%BF%E7%94%A8-ntp-%E6%A0%A1%E6%BA%96%E6%99%82%E9%96%93-b944ee1fb6d0)
  - [使用 ssh 多台 server 小撇步](https://tasb00429.medium.com/ssh-server-%E5%B0%8F%E6%8A%80%E5%B7%A7-ddfc90498f20)
  - [換 Domain 該注意的事情](https://tasb00429.medium.com/%E6%8F%9B-domain-%E8%A9%B2%E6%B3%A8%E6%84%8F%E7%9A%84%E4%BA%8B%E6%83%85-a434b3d9e07)
  - [Laradock 使用 zsh, ssh…etc](https://tasb00429.medium.com/laradock-%E4%BD%BF%E7%94%A8-zsh-49b0ae0745f0)
