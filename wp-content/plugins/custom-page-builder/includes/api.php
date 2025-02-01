<?php
add_action('rest_api_init', function() {
    register_rest_route('custom-builder/v1', '/blocks', array(
        'methods'  => 'GET',
        'callback' => 'get_custom_blocks',
    ));
});

function get_custom_blocks() {
    // Voorlopige data voor de blokken
    $blocks = array(
        array(
            'id'      => 1,
            'type'    => 'text',
            'content' => 'Welkom op jouw AI-gestuurde page builder!'
        ),
        array(
            'id'   => 2,
            'type' => 'image',
            'url'  => 'https://example.com/image.jpg'
        )
    );
    return new WP_REST_Response(array(
        'status' => 'success',
        'blocks' => $blocks
    ), 200);
}
