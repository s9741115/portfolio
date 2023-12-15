---
title: 串接中信金流
description: 直接串接中信金流，提供 API 給第三方支付
header: https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/payment-processor/payment-processor1.png
type: Backend
category: Side Project
tags:
  - Laravel
createdAt: 2023-03-11T13:32:52.449Z
---

### 後端技術 ＆ 部分邏輯

此案子主要是接中信的金流，並提供 API 給私人支付使用，專案以 composer package 的方式設計
 
此專案因為 中信的 PHP 只支援到最高 7.3，於是部署部分採用 Docker 

API 設計部分包含簡單的加解密

<smart-figure src="https://raw.githubusercontent.com/5SMNOONMS5/portfolio/main/resources/projects/payment-processor/payment-processor2.png"></smart-figure>

並撰寫 Unit Test 

### 使用技術

* Server
  * Laravel
  * Docker
