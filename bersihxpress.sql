-- --------------------------------------------------------
-- Database for BersihXpress Laundry Management System
-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- --------------------------------------------------------
-- Database: `bersihxpress`
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `bersihxpress`;
USE `bersihxpress`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `user_id` VARCHAR(36) PRIMARY KEY,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('owner', 'karyawan') NOT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `no_telepon` VARCHAR(15),
  `foto_profil` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `bisnis`
-- --------------------------------------------------------

CREATE TABLE `bisnis` (
  `bisnis_id` VARCHAR(36) PRIMARY KEY,
  `owner_id` VARCHAR(36) NOT NULL,
  `nama_bisnis` VARCHAR(100) NOT NULL,
  `alamat` TEXT NOT NULL,
  `no_telepon` VARCHAR(15),
  `logo` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`owner_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `karyawan`
-- --------------------------------------------------------

CREATE TABLE `karyawan` (
  `karyawan_id` VARCHAR(36) PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `status` ENUM('aktif', 'nonaktif') DEFAULT 'aktif',
  `gaji_pokok` DECIMAL(10,2) DEFAULT 0,
  `tanggal_bergabung` DATE NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `pelanggan`
-- --------------------------------------------------------

CREATE TABLE `pelanggan` (
  `pelanggan_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `nama` VARCHAR(100) NOT NULL,
  `alamat` TEXT,
  `no_telepon` VARCHAR(15),
  `email` VARCHAR(100),
  `catatan` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `kategori_layanan`
-- --------------------------------------------------------

CREATE TABLE `kategori_layanan` (
  `kategori_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `nama_kategori` VARCHAR(50) NOT NULL,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `layanan`
-- --------------------------------------------------------

CREATE TABLE `layanan` (
  `layanan_id` VARCHAR(36) PRIMARY KEY,
  `kategori_id` VARCHAR(36) NOT NULL,
  `nama_layanan` VARCHAR(100) NOT NULL,
  `harga` DECIMAL(10,2) NOT NULL,
  `satuan` VARCHAR(20) NOT NULL,
  `estimasi_waktu` INT DEFAULT 24, -- dalam jam
  `deskripsi` TEXT,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori_layanan`(`kategori_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `transaksi`
-- --------------------------------------------------------

CREATE TABLE `transaksi` (
  `transaksi_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `pelanggan_id` VARCHAR(36),
  `karyawan_id` VARCHAR(36),
  `no_nota` VARCHAR(20) UNIQUE NOT NULL,
  `tanggal_masuk` DATETIME NOT NULL,
  `tanggal_selesai` DATETIME,
  `status` ENUM('pending', 'proses', 'selesai', 'diambil', 'batal') DEFAULT 'pending',
  `total_harga` DECIMAL(10,2) NOT NULL,
  `dibayar` DECIMAL(10,2) DEFAULT 0,
  `catatan` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE,
  FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan`(`pelanggan_id`) ON DELETE SET NULL,
  FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan`(`karyawan_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `detail_transaksi`
-- --------------------------------------------------------

CREATE TABLE `detail_transaksi` (
  `detail_id` VARCHAR(36) PRIMARY KEY,
  `transaksi_id` VARCHAR(36) NOT NULL,
  `layanan_id` VARCHAR(36) NOT NULL,
  `jumlah` DECIMAL(10,2) NOT NULL,
  `harga_satuan` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `catatan` TEXT,
  FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi`(`transaksi_id`) ON DELETE CASCADE,
  FOREIGN KEY (`layanan_id`) REFERENCES `layanan`(`layanan_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `pengeluaran`
-- --------------------------------------------------------

CREATE TABLE `pengeluaran` (
  `pengeluaran_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `kategori` ENUM('operasional', 'gaji', 'perlengkapan', 'lainnya') NOT NULL,
  `jumlah` DECIMAL(10,2) NOT NULL,
  `keterangan` TEXT NOT NULL,
  `tanggal` DATE NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `absensi`
-- --------------------------------------------------------

CREATE TABLE `absensi` (
  `absensi_id` VARCHAR(36) PRIMARY KEY,
  `karyawan_id` VARCHAR(36) NOT NULL,
  `tanggal` DATE NOT NULL,
  `jam_masuk` TIME,
  `jam_keluar` TIME,
  `status` ENUM('hadir', 'izin', 'sakit', 'alfa') NOT NULL,
  `keterangan` TEXT,
  FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan`(`karyawan_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `template_nota`
-- --------------------------------------------------------

CREATE TABLE `template_nota` (
  `template_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `header` TEXT,
  `footer` TEXT,
  `format_nota` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `template_pesan`
-- --------------------------------------------------------

CREATE TABLE `template_pesan` (
  `template_id` VARCHAR(36) PRIMARY KEY,
  `bisnis_id` VARCHAR(36) NOT NULL,
  `jenis` ENUM('masuk', 'proses', 'selesai', 'pembayaran', 'lainnya') NOT NULL,
  `isi_pesan` TEXT NOT NULL,
  `is_active` BOOLEAN DEFAULT true,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`bisnis_id`) REFERENCES `bisnis`(`bisnis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `notifikasi`
-- --------------------------------------------------------

CREATE TABLE `notifikasi` (
  `notifikasi_id` VARCHAR(36) PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `judul` VARCHAR(100) NOT NULL,
  `pesan` TEXT NOT NULL,
  `jenis` ENUM('info', 'warning', 'success', 'error') NOT NULL,
  `dibaca` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;