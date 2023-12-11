---
title: 數位照護 APP
description: 將照護流程延續至病友生活中
header: https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot1.png
tags:
  - Laravel
createdAt: 2023-03-11T13:32:52.449Z
---

### 專案範疇

負責開發給長庚醫療內部使用的後台，以及 API 給 iOS、Android 使用

### 示意圖

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot2.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot3.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot4.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot5.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot7.png"></smart-figure>

### 後端技術 ＆ 部分邏輯

此專案著重在配合醫院的邏輯上面，技術上能比較能分享的是使用到了 **Firebase** 來發送 Push Notification，還有跟 [Google Form 結合來做問卷調查](https://medium.com/@tasb00429/laravel-google-form-%E5%BF%AB%E9%80%9F%E4%B8%94%E7%B0%A1%E6%98%93%E7%9A%84%E5%95%8F%E5%8D%B7%E7%B3%BB%E7%B5%B1-73fe97f0efd4)

醫院邏輯這邊頗複雜，除了每個醫生只能看得到自己的病人之外（ 透過醫生主力疾病關聯病例來區分 ），還需要根據病例來控管相對應的功能權限，每個功能權限還有相對應的狀態要判斷

因為保密協議，醫生這邊還只能看到病人特定欄位，比如只能看到病例代號，不能看到病人的真實姓名

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/cancer/screenshot6.png"></smart-figure>

而為了讓 Query 更快速，資料庫會有一些反正規劃的設計，比如以上圖來說病人的病例會再**多**存一些欄位在病人的資料表

比如能否使用留言板、量表、聯絡醫療團隊和治療計畫....等。

### 使用技術

* Server
  * Linode

* 後端
  * JWT Token
  * [Livewire](https://laravel-livewire.com/)
  * [Laravel-charts](https://github.com/LaravelDaily/laravel-charts)
  * [Firebase Cloud Messaging](https://github.com/laravel-notification-channels/fcm)

### 相關技術文章

- [Laravel + Google Form = 快速且簡易的問卷系統](https://medium.com/@tasb00429/laravel-google-form-%E5%BF%AB%E9%80%9F%E4%B8%94%E7%B0%A1%E6%98%93%E7%9A%84%E5%95%8F%E5%8D%B7%E7%B3%BB%E7%B5%B1-73fe97f0efd4)
- [Livewire with CKEditor](https://medium.com/@tasb00429/livewire-with-ckeditor-ac849b7572d2)

### Reference

* [柔化數位醫療服務](https://iroridesign.com/warmy-tracker)
* [App Store](https://apps.apple.com/tw/app/%E5%81%A5%E5%BA%B7%E7%AE%A1%E5%AE%B6%E6%9A%96%E6%9A%96/id1670311026)
