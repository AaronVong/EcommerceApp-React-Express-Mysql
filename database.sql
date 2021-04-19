-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 19, 2021 at 05:41 AM
-- Server version: 8.0.21
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `technow`
--

-- --------------------------------------------------------

--
-- Table structure for table `tn_admin`
--

DROP TABLE IF EXISTS `tn_admin`;
CREATE TABLE IF NOT EXISTS `tn_admin` (
  `admin_name` varchar(50) NOT NULL,
  `admin_password` varchar(50) NOT NULL,
  `admin_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tn_admin`
--

INSERT INTO `tn_admin` (`admin_name`, `admin_password`, `admin_id`) VALUES
('admin', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tn_category`
--

DROP TABLE IF EXISTS `tn_category`;
CREATE TABLE IF NOT EXISTS `tn_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tn_category`
--

INSERT INTO `tn_category` (`category_id`, `category_name`) VALUES
(1, 'phone'),
(2, 'laptop'),
(3, 'tablet'),
(4, 'speaker'),
(5, 'headphone'),
(7, 'portable-charger');

-- --------------------------------------------------------

--
-- Table structure for table `tn_customer`
--

DROP TABLE IF EXISTS `tn_customer`;
CREATE TABLE IF NOT EXISTS `tn_customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_address` text NOT NULL,
  `customer_phone` char(13) NOT NULL,
  `customer_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email` (`customer_email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tn_order`
--

DROP TABLE IF EXISTS `tn_order`;
CREATE TABLE IF NOT EXISTS `tn_order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_deadline` datetime DEFAULT NULL,
  `order_worth` decimal(10,0) DEFAULT NULL,
  `status_id` tinyint NOT NULL DEFAULT '4',
  `customer_id` int NOT NULL,
  `order_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_order_customer` (`customer_id`),
  KEY `fk_order_status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tn_order_detail`
--

DROP TABLE IF EXISTS `tn_order_detail`;
CREATE TABLE IF NOT EXISTS `tn_order_detail` (
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `order_detail_originprice` decimal(10,0) NOT NULL,
  `order_detail_number` tinyint NOT NULL,
  `order_detail_worth` decimal(10,0) NOT NULL,
  `order_detail_saleprice` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `fk_orderDetail_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tn_producer`
--

DROP TABLE IF EXISTS `tn_producer`;
CREATE TABLE IF NOT EXISTS `tn_producer` (
  `producer_id` int NOT NULL AUTO_INCREMENT,
  `producer_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `producer_thumb` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`producer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tn_producer`
--

INSERT INTO `tn_producer` (`producer_id`, `producer_name`, `producer_thumb`) VALUES
(1, 'samsung', 'Samsung42-b_25.jpg'),
(2, 'apple', 'Apple54-b_5.jpg'),
(3, 'asus', 'Asus44-b_20.jpg'),
(4, 'acer', 'Acer44-b_37.jpg'),
(5, 'xiaomi', 'Xiaomi42-b_45.jpg'),
(6, 'huawei', 'Huawei42-b_30.jpg'),
(7, 'dell', 'Dell44-b_2.jpg'),
(8, 'hp', 'HP-Compaq44-b_36.png'),
(9, 'sony', 'Sony54-b_50.jpg'),
(10, 'lenovo', 'Lenovo44-b_50.jpg'),
(11, 'anker', 'Anker54-b_17.png'),
(12, 'ava', 'AVA57-b_50.jpg'),
(13, 'oppo', 'OPPO42-b_27.png');

-- --------------------------------------------------------

--
-- Table structure for table `tn_product`
--

DROP TABLE IF EXISTS `tn_product`;
CREATE TABLE IF NOT EXISTS `tn_product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_thumb` varchar(255) NOT NULL,
  `product_originprice` decimal(10,0) NOT NULL,
  `product_sale` float NOT NULL,
  `product_instock` int NOT NULL,
  `product_ishighlight` tinyint(1) DEFAULT '0',
  `status_id` tinyint DEFAULT NULL,
  `producer_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `status_id` (`status_id`),
  KEY `producer_id` (`producer_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tn_product`
--

INSERT INTO `tn_product` (`product_id`, `product_name`, `product_thumb`, `product_originprice`, `product_sale`, `product_instock`, `product_ishighlight`, `status_id`, `producer_id`, `category_id`) VALUES
(1, 'iphone 11 64gb', 'iphone-11-red-600x600.jpg', '19990000', 0, 9, 1, 1, 2, 1),
(2, 'iphone 12 pro max 512GB', 'iphone-12-pro-max-512gb-191020-021035-600x600.jpg', '42990000', 0.08, 8, 0, 1, 2, 1),
(6, 'iphone 11 pro max 256GB', 'iphone-11-pro-max-256gb-black-600x600.jpg', '33990000', 0, 10, 0, 1, 2, 1),
(7, 'iphone 7 32GB', 'iphone-7-plus-32gb-gold-600x600-600x600.jpg', '8990000', 0, 10, 0, 1, 2, 1),
(8, 'iphone SE 128GB', 'iphone-se-128gb-2020-261820-101803-200x200.jpg', '13990000', 0, 10, 0, 1, 2, 1),
(9, 'samsung galaxy note 20 ultra 5g', 'samsung-galaxy-note-20-ultra-5g-063420-123447-600x600.jpg', '32990000', 0.06, 10, 1, 1, 1, 1),
(10, 'samsung galaxy a51', 'samsung-galaxy-a51-8gb-blue-600x600-600x600.jpg', '8390000', 0, 10, 0, 1, 1, 1),
(11, 'samsung galaxy a21s', 'samsung-galaxy-a21s-3gb-055520-045548-600x600.jpg', '5690000', 0.07, 10, 0, 1, 1, 1),
(12, 'samsung galaxy a31', 'samsung-galaxy-a31-055720-045750-600x600.jpg', '6490000', 0, 10, 0, 1, 1, 1),
(13, 'samsung galaxy note 20', 'samsung-galaxy-note-20-062220-122200-600x600.jpg', '23900000', 0.08, 10, 0, 1, 1, 1),
(14, 'samsung galaxy s10 lite', 'samsung-galaxy-s10-lite-blue-thumb-600x600.jpg', '14990000', 0.13, 10, 0, 1, 1, 1),
(15, 'samsung galaxy s20+', 'samsung-galaxy-s20-plus-600x600-fix-600x600.jpg', '23990000', 0, 10, 0, 1, 1, 1),
(16, 'samsung galaxy note 10 lite', 'samsung-galaxy-note-10-lite-thumb-600x600.jpg', '11490000', 0.06, 10, 0, 1, 1, 1),
(17, 'oppo reno4', 'oppo-reno4-pro-274720-034747-600x600.jpg', '8490000', 0, 10, 1, 1, 13, 1),
(18, 'oppo a93', 'oppo-a93-230520-060532-200x200.jpg', '7490000', 0, 10, 1, 1, 13, 1),
(19, 'oppo find x2', 'oppo-find-x2-blue-600x600-600x600.jpg', '23090000', 0.16, 10, 1, 1, 13, 1),
(20, 'oppo reno3 pro', 'oppo-reno3-trang-600x600-600x600.jpg', '14290000', 0.37, 10, 1, 1, 13, 1),
(21, 'oppo a52', 'oppo-a52-black-600x600-600x600.jpg', '5990000', 0, 10, 0, 1, 13, 1),
(22, 'oppo a53', 'oppo-a53-2020-blue-600x600-600x600.jpg', '4490000', 0, 10, 0, 1, 13, 1),
(23, 'Huawei nova 7i (Nền tảng Huawei Moblie Service)', 'huawei-nova-7i-pink-600x600-600x600.jpg', '6990000', 0.14, 10, 0, 1, 6, 1),
(24, 'Huawei Y6p (Nền tảng Huawei Moblie Service)', 'huawei-y6p-xanh-600x600-200x200.jpg', '3340000', 0, 10, 0, 1, 6, 1),
(28, 'Xiaomi 10T Pro 5G', 'xiaomi-mi-10t-pro-300420-070407-600x600.jpg', '12990000', 0, 10, 0, 1, 5, 1),
(30, 'Xiaomi Redmi Note 9 Pro (6GB/128GB)', 'xiaomi-redmi-note-9-pro-128gb-white-600x600-200x200.jpg', '6990000', 0, 5, 0, 1, 5, 1),
(31, 'Laptop Dell Inspiron 5593 i5 1035G1', 'dell-inspiron-5593-i5-1035g1-8gb-256gb-2gb-mx230-w-213570-400x400.jpg', '17990000', 0, 0, 1, 1, 7, 2),
(33, 'Laptop Apple MacBook Air 2017 i5', 'apple-macbook-air-mqd32sa-a-i5-5350u-400x400.jpg', '20990000', 0.1, 10, 1, 1, 2, 2),
(36, 'Laptop HP 15s fq1111TU i3', 'hp-15s-fq1111tu-i3-193r0pa-224012-224012-400x400.jpg', '11390000', 0, 10, 1, 1, 8, 2),
(37, 'Laptop HP 348 G7 i3', 'hp-348-g7-i3-9pg83pa-221511-400x400.jpg', '11390000', 0, 10, 1, 1, 8, 2),
(38, 'Laptop HP 348 G7 i5', 'hp-348-g7-i5-9ph06pa-kg2-1-218439-400x400.jpg', '16290000', 0, 10, 1, 1, 8, 2),
(39, 'iPad Mini 7.9 inch', 'ipad-mini-79-inch-wifi-2019-gold-400x400.jpg', '10990000', 0.09, 11, 1, 1, 2, 3),
(40, ' iPad 8 Wifi 32GB (2020)', 'ipad-8-wifi-32gb-2020-184620-064653-400x400.jpg', '9990000', 0, 11, 1, 1, 2, 3),
(41, 'iPad Pro 11 inch ', 'ipad-pro-11-inch-2020-xam-600x600-fix-400x400.jpg', '21990000', 0, 11, 1, 1, 2, 3),
(42, 'Samsung Galaxy Tab A7', 'samsung-galaxy-tab-a7-2020-vangdong-600x600-400x400.jpg', '7990000', 0, 11, 1, 1, 1, 3),
(43, 'Polymer 20.000mAh Type C PowerCore Essential PD Anker A1281 Fabric', 'sac-du-phong-20000mah-powercore-essential-anker-1-600x600.jpg', '1400000', 0, 11, 1, 1, 11, 7),
(44, ' Anker PowerCore Select A1223', 'sac-du-phong-10000mah-anker-powercore-select-a1223-1-600x600.jpg', '600000', 0, 11, 1, 1, 11, 7),
(45, 'PowerIQ 2.0 Anker PowerCore II A1230', 'sac-du-phong-10000mah-anker-powercore-ii-a1230-1-600x600.jpg', '950000', 0, 11, 0, 1, 11, 7),
(46, 'AVA Cat 3S', 'pin-sac-du-phong-7500mah-ava-cat-3s-cam-trang-1-600x600.jpg', '250000', 0.15, 11, 1, 1, 12, 7),
(47, 'AVA LJ JP197', 'pin-sac-du-phong-7500mah-ava-lj-jp197-add-600x600.jpg', '250000', 0.15, 11, 11, 1, 12, 7),
(48, 'AVA LA CT23', 'pin-sac-du-phong-7500mah-ava-la-ct23-add-600x600.jpg', '250000', 0.15, 11, 1, 1, 12, 7),
(49, 'AirPods Pro sạc không dây Apple MWP22\r\n', 'tai-nghe-bluetooth-airpods-2-apple-mv7n2-trang-avatar-1-600x600.jpg', '6990000', 0.09, 11, 1, 1, 2, 5),
(50, 'AirPods 2 Apple MV7N2', 'tai-nghe-bluetooth-airpods-pro-apple-mwp22-ava-600x600.jpg', '5990000', 0.06, 11, 0, 1, 2, 5),
(51, 'Sony WH-1000XM4', 'tai-nghe-chup-tai-bluetooth-sony-wh-1000xm4-den-ava-2-600x600.jpg', '8490000', 0.05, 11, 1, 1, 9, 5),
(52, 'Sony WH-XB900N', 'tai-nghe-chup-tai-bluetooth-sony-wh-xb900n-ava-600x600.jpg', '5790000', 0, 11, 1, 1, 9, 5),
(56, 'Laptop Acer Swift 3 SF315 52 38YQ i3 8130U', 'acer-swift-sf315-52-38yq-i3-8130u-4gb-1tb-156f-win-21-208863-600x600.jpg', '17990000', 0.9, 6, 1, 1, 4, 2),
(57, 'Laptop Dell Inspiron N3493 i3 1005G1', '637189395687155128_dell-inspiron-n3493-den-1.jpg', '10990000', 0.04, 8, 0, 1, 7, 2),
(58, 'Loa bluetooth Sony Extra Bass SRS-XB33', 'loa-bluetooth-sony-srs-xb33-av-600x600-1-600x600.jpg', '3690000', 0, 6, 0, 1, 9, 4),
(60, 'Loa bluetooth Sony Extra Bass SRS-XB23', 'loa-bluetooth-sony-extra-bass-srs-xb23-den-av-600x600-1-600x600.jpg', '1530000', 0.06, 4, 0, 1, 9, 4),
(61, 'Loa Bluetooth Sony Extra Bass SRS-XB12', 'loa-bluetooth-sony-srs-xb12-1-600x600-1-600x600.jpg', '1290000', 0.04, 4, 0, 1, 9, 4),
(62, 'Máy tính bảng Huawei MatePad T8 (Nền tảng Huawei Mobile Service)', 'huawei-matepad-t8-600x600-400x400.jpg', '3290000', 0.05, 4, 1, 1, 6, 3),
(70, 'Tai nghe Bluetooth True Wireless Anker Soundcore Liberty Air 2 A3910 Xám', 'tai-nghe-true-wireless-anker-soundcore-a3910-xam-1-600x600-1-600x600.jpg', '3000000', 0.15, 5, 0, 1, 11, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tn_status`
--

DROP TABLE IF EXISTS `tn_status`;
CREATE TABLE IF NOT EXISTS `tn_status` (
  `status_id` tinyint NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tn_status`
--

INSERT INTO `tn_status` (`status_id`, `status_name`) VALUES
(1, 'available'),
(2, 'not available'),
(3, 'pending'),
(4, 'new'),
(5, 'shipping'),
(6, 'delivered'),
(7, 'aborted'),
(8, 'approval'),
(9, 'confirmed');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tn_order`
--
ALTER TABLE `tn_order`
  ADD CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `tn_customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_status` FOREIGN KEY (`status_id`) REFERENCES `tn_status` (`status_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tn_order_detail`
--
ALTER TABLE `tn_order_detail`
  ADD CONSTRAINT `fk_orderDetail_order` FOREIGN KEY (`order_id`) REFERENCES `tn_order` (`order_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orderDetail_product` FOREIGN KEY (`product_id`) REFERENCES `tn_product` (`product_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tn_product`
--
ALTER TABLE `tn_product`
  ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `tn_category` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_producer` FOREIGN KEY (`producer_id`) REFERENCES `tn_producer` (`producer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_status` FOREIGN KEY (`status_id`) REFERENCES `tn_status` (`status_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
