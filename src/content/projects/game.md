---
title: 6 款遊戲
description: 這幾款遊戲讓使用者可以下注，機率隨機開獎
header: https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game1.png
tags: 
  - Laravel
  - GCP
createdAt: 2023-03-11T13:32:52.449Z
---

### 示意圖

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game2.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game3.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game4.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game5.png"></smart-figure>
<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/game/game6.png"></smart-figure>

### 後端技術細節

處理 2 百多萬筆的資料（ 在寫此篇的時候的數據 ），使用 Redis pipelining 搭配 Laravel 的 Queue 處理開獎以及查詢歷史紀錄

這幾款遊戲在處理開獎的時候時間會拉比較長，所以會把開獎 event 都放到 Queue 裏面，並固定在半夜某時段去更新

而因**前端**跟**後台**都需要查詢歷史紀錄，為了避免資料庫一直被查詢，所以預先把歷史紀錄放到 Redis 裏面

但因為更新的歷史資料蠻大，所以使用 pipelining 加上 chunk 的方式來處理

### GCP 技術細節

此專案是我第一次使用 GCP, 使用到 EC2, Static IP, Cloud SQL, Domain.. 算是比較基礎的

### 使用技術

* Server
  * GCP

* 後端
	- Laravel
	- Redis

* API Docs
  - [swagger](https://swagger.io/)
