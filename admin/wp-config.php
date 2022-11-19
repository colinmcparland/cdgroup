<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'cdg');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'password');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ',}!BE,EJs%l%Xb6=OSzF(7(x{@.gmvnl$ty|tsGQ/!2,Et*J^D|bT`s#Umku8cAz');
define('SECURE_AUTH_KEY',  'vcwM,=>8yqx?LCz@^CI4[83be-SMJdTa LJ==h%1H+#xGn&S64kZV@<tLfoSuER$');
define('LOGGED_IN_KEY',    'hY<rd%Q{,SaGPU|!_V<>yP&VhtW?To:PK&jT.PjEU!(w,A.jt=iT9 Q%2%SS_fp]');
define('NONCE_KEY',        'BI#}%veH.mx5NR:yhpn56R1dSG3dMc@WE2LgCj=c|3I06|d<op o#|e(+=Tdc?8h');
define('AUTH_SALT',        'YR^mkxbfyoKt=iQ`ht#)NC^0d[f}1>h@wR;Gz7lLmMO)vGGT1!d,jdCo6F83XT+u');
define('SECURE_AUTH_SALT', 'bcj+c0~1O]M?P_s7s@zJ%!avNq Pg`Jdt`%G&f%EaZMStZ2:yrk3FxWc1$*LP_xw');
define('LOGGED_IN_SALT',   'u4Z#Gz^w$@W^ofZzE~gW2lX,HB&PN)9:RA z}`#KouBgIi{j2JaHYT+h<|[Sl<uE');
define('NONCE_SALT',       'JDRjfi,VDP%IfDwDA^&ANM1HEIYdmT8F]*Sp2Qeh$Zx6H;a4-q1L0by=I~Fg<6Qn');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
