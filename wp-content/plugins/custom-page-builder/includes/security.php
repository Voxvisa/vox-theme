<?php
// Basisbeveiligingsfuncties. Voeg hier later je eigen code toe.
function ccb_validate_api_key($provided_key) {
    $expected_key = 'JOUW_VASTE_API_KEY'; // Pas dit aan naar jouw gewenste API-key
    return $provided_key === $expected_key;
}
