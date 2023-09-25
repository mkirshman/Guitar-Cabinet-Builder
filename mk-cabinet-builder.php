<?php
/**
 * Plugin Name: Guitar Cabinet Builder
 * Plugin URI: http://metalkindred.com
 * Description: Plugin builder for adding custom made guitar cabinets to woocommerce cart.
 * Version: 1.0.0
 * Author: Matthew Kirshman Sr.
 * Author URI: http://metalkindred.com
 * License: ©2022 Metal Kindred Music
 */


 add_action('init', 'initialize_cabinet_builder');

 function initialize_cabinet_builder(){
    wp_enqueue_style( 'mk-cb-styles', plugin_dir_url(__FILE__) . '/assets/css/mk-cb-styles.css' );

	wp_enqueue_script( 'owl-carousel', plugin_dir_url(__FILE__) . '/assets/js/mk-cb-scripts.js', array( 'jquery' ) );
	
 }

 include 'includes/mk-cb-shortcodes.php';