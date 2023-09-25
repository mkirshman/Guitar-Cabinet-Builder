<?php
// function that runs when shortcode is called
function initialize_builder() { 

    $message = '<div class="mk-cabinet-builder">';
   
    // Things that you want to do.
    $message .= build_markup( 'Cabinet Type',  'cabinet_type', 'type_choices', 'q1' );
    $message .= '<div class="mkbtn-container">';
    $message .= '<div id="mkbtn-previous" class="disabled">';
    $message .= '<button class="btn-previous">Previous</button>';
    $message .= '</div>';

    $message .= '<div id="mkbtn-next">';
    $message .= '<button class="btn-next">Next</button>';
    $message .= '</div>';

    $message .= '<div id="mkbtn-submit" class="disabled">';
    $message .= '<button class="btn-submit">Add To Cart</button>';
    $message .= '</div>';

    $message .= '</div>';
    
    $message .= '</div>';
    // Output needs to be return
    return $message;
}
// register shortcode
add_shortcode('cabinet_builder', 'initialize_builder');

function init_builder_options() {
    if( function_exists('acf_add_options_page') ) {
        
        $option_page = acf_add_options_page(array(
            'page_title' 	=> 'MK Guitar Cabinet Builder',
            'menu_title'	=> 'MK Cabinet Builder',
            'menu_slug' 	=> 'mk-cabinet-builder',
            'capability'	=> 'edit_posts',
            'redirect'		=> false
        ));
        
    }
}
add_action('acf/init', 'init_builder_options');

function build_markup( $title, $field, $sub_field, $q_num ){
    $message = '';
    if($q_num == 'q1'){
        $message .= '<div id="' . $q_num .'" class="step current">';
    }else{
        $message .= '<div id="' . $q_num .'" class="step">';
    }
    
    $message .= '<div class="question">';
    $message .= '<h2>' . $title . '</h2>';
    $message .= '</div>';
    $message .= '<div class="option">';

    if( have_rows($field, 'option') ): while ( have_rows($field, 'option') ) : the_row(); 

    if( have_rows($sub_field) ): while ( have_rows($sub_field) ) : the_row();  

        
        $message .= '<div><img class="background-img" src="' . get_sub_field('image') . '"/><br/>' . get_sub_field('type') . '<br/>' . '$' . get_sub_field('price') . '</div>';
   

        endwhile; endif;

    endwhile; endif;

    $message .= '</div>';
    $message .= '</div>';

    return $message;
}