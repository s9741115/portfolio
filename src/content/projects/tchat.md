---
title: TChat
description: Task Management APP
header: https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat2.png
type: Side Project
tags:
  - iOS
createdAt: 2023-03-11T13:32:52.449Z
---

### 專案範疇

負責開發 iOS APP, 上架 App Store, 接後端 API

### 功能面

專案使用 Swift 搭配 MVVM 架構開發，使用 [Carthage](https://github.com/Carthage/Carthage) 管理第三方套件，[Fastlane](https://fastlane.tools/) 來打包上架

功能方面

* **廣告**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat5.png"></smart-figure>
* **Google 登入、Apple 登入**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat6.png"></smart-figure>
* **Push Notification**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat7.png"></smart-figure>
* **Camera、Photo Library**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat8.png"></smart-figure> 
* **Side Menu**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat9.png"></smart-figure>
* **加朋友、發任務、接任務、留言**
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat10.png"></smart-figure>
  <smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat11.png"></smart-figure>

後端開發的夥伴使用 [Firestore Database](https://cloud.google.com/firestore?utm_source=google&utm_medium=cpc&utm_campaign=japac-SG-all-en-dr-SKWS-all-all-trial-DSA-dr-1605216&utm_content=text-ad-none-none-DEV_c-CRE_655856180813-ADGP_Hybrid+%7C+SKWS+-+BRO+%7C+DSA+~+All+Webpages-KWID_39700076131768134-dsa-1456167871416&userloc_9040379-network_g&utm_term=KW_&gad_source=1&gclid=Cj0KCQiAyeWrBhDDARIsAGP1mWSED2MSOv_Waz351u-cUvO-9caMVbP6BUz9PHmCT77tJpVdjwE-POkaAvGjEALw_wcB&gclsrc=aw.ds) 來處理資料

### iOS 技術細節

畫面上我覺得蠻難的，但設計師規劃的 Design Guild line 非常完整，只要能做好 component 就可以了

舉個小🌰

<smart-figure image-class="w-96 h-96" src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat1.png"></smart-figure>

這邊 Button 設計好只要傳 config 裡面包含文字跟圖片

再來是任務列表資料的處理

<smart-figure image-class="justify-items-center" src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/tchat/tchat4.png"></smart-figure>

API 這邊是 web socket base 的，會一直監聽當其他人對任務 state 的更動

畫面處理上要去 Diff 當前頁面的差異化，當刪除的時候 Remove，有新的或者有更新都只單純去更新那 TableviewCell 

這邊我採用此套件 [Diff](https://github.com/wokalski/Diff.swift) 來解決

而任務又分成**我的任務**跟**他的任務**，然後再各別分成**進行中**跟**已完成**，進行中跟完成的**排序**又各別不一樣

實作上有非常大的挑戰

### Reference

* [Facebook](https://www.facebook.com/tchat.work/)

