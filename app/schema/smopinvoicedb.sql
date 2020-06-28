-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2019 at 02:54 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smopinvoicedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientAddress1` varchar(255) DEFAULT NULL,
  `clientAddress2` varchar(255) DEFAULT NULL,
  `clientCity` varchar(255) DEFAULT NULL,
  `clientPincode` varchar(10) DEFAULT NULL,
  `clientGstNo` varchar(255) DEFAULT NULL,
  `createdDate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='List of Clients';

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(255) NOT NULL,
  `clientId` int(255) NOT NULL,
  `invoiceDate` date DEFAULT NULL,
  `invoiceNo` varchar(255) NOT NULL,
  `eWayBillNo` varchar(255) DEFAULT NULL,
  `gstType` varchar(255) DEFAULT NULL,
  `gstSlab` int(255) DEFAULT NULL,
  `goodsValue` int(255) DEFAULT NULL,
  `packingValue` int(255) DEFAULT NULL,
  `gstValue` int(255) DEFAULT NULL,
  `totalAmount` int(255) DEFAULT NULL,
  `advanceAmount` int(255) DEFAULT NULL,
  `balanceAmount` int(255) DEFAULT NULL,
  `preparedBy` varchar(255) DEFAULT NULL,
  `checkedBy` varchar(255) DEFAULT NULL,
  `refNo` varchar(255) DEFAULT NULL,
  `despatchedThru` varchar(255) DEFAULT NULL,
  `lrNo` varchar(255) DEFAULT NULL,
  `despatchedDate` date DEFAULT NULL,
  `despatchedTo` varchar(255) DEFAULT NULL,
  `documentsThru` varchar(255) DEFAULT NULL,
  `invoiceOrgType` varchar(255) DEFAULT NULL,
  `createdDate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(255) NOT NULL,
  `invoiceId` int(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `quantity` int(255) DEFAULT NULL,
  `rate` int(255) DEFAULT NULL,
  `ratePer` int(255) DEFAULT NULL,
  `amount` int(255) DEFAULT NULL,
  `createdDate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
