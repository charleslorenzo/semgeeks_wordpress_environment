<?php

namespace Roots\Sage\Extras;

use Roots\Sage\Setup;

/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }

  // Add class if sidebar is active
  if (Setup\display_sidebar()) {
    $classes[] = 'sidebar-primary';
  }

  // Add class if not the front page
  if (!is_front_page())
  {
    $classes[] = 'not-front';
  }

  // Add classes for User Agent and Operating System
  global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;
  
  // Browser
  if($is_lynx)
  {
    $classes[] = 'lynx';
  } 
  elseif($is_gecko) 
  {
    $classes[] = 'gecko';
  }
  elseif($is_opera) 
  {
    $classes[] = 'opera';
  }
  elseif($is_NS4) 
  {
    $classes[] = 'ns4';
  }
  elseif($is_safari) 
  {
    $classes[] = 'safari';
  }
  elseif($is_chrome) 
  {
    $classes[] = 'chrome';
  }
  elseif($is_IE) 
  {
    $classes[] = 'ie';
          
    // IE Version Number
    if(preg_match('/MSIE ([0-9]+)([a-zA-Z0-9.]+)/', $_SERVER['HTTP_USER_AGENT'], $browser_version))
    {
      $classes[] = 'ie'.$browser_version[1];
    }
  } 
  else
  {
    $classes[] = 'unknown';
  }

  // Iphone
  if($is_iphone) 
  {
    $classes[] = 'iphone';
  }

  // Operating System
  if(stristr($_SERVER['HTTP_USER_AGENT'],"mac")) 
  {
    $classes[] = 'osx';
  } 
  elseif(stristr($_SERVER['HTTP_USER_AGENT'],"linux")) 
  {
    $classes[] = 'linux';
  } 
  elseif(stristr($_SERVER['HTTP_USER_AGENT'],"windows")) 
  {
    $classes[] = 'windows';
  }

  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\body_class');

/**
 * Clean up the_excerpt()
 */
function excerpt_more() {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'sage') . '</a>';
}
add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');
