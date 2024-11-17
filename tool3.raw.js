// Selector
let selection1 = document.querySelector('#mat_type_select'); // Material Type
let selection2 = document.querySelector('#wa_select');       // World Ascension Level
let selection3 = document.querySelector('#dl_select');       // Domain Level
let selection4 = document.querySelector('#rarity_select');   // Rarity

// World Option
let w_option0 = document.getElementById('world0');
let w_option1 = document.getElementById('world1');
let w_option2 = document.getElementById('world2');
let w_option3 = document.getElementById('world3');
let w_option4 = document.getElementById('world4');
let w_option5 = document.getElementById('world5');
let w_option6 = document.getElementById('world6');
let w_option7 = document.getElementById('world7');
let w_option8 = document.getElementById('world8');

// Domain
let d_option1 = document.getElementById('domain1');
let d_option2 = document.getElementById('domain2');
let d_option3 = document.getElementById('domain3');
let d_option4 = document.getElementById('domain4');

// Rarity Option
let r_option2 = document.getElementById('rarity2');
let r_option3 = document.getElementById('rarity3');
let r_option4 = document.getElementById('rarity4');
let r_option5 = document.getElementById('rarity5');

let output_rarity   = document.getElementById("out_rarity");
let output_mat_min  = document.getElementById("out_min_mat");
let output_mat_max  = document.getElementById("out_max_mat");
let output_turn_min = document.getElementById("out_min_turn");
let output_turn_max = document.getElementById("out_max_turn");
let output_desc     = document.getElementById("out_description");

let procButton  = document.getElementById("process_button");
let numberInput = document.getElementById("number_input");

let t_selected = null;
let w_selected = null;
let d_selected = null;
let r_selected = null;
let numInput   = null;

/*
* This part only for limit selection
* 
*/
// Material Type Selection
selection1.onchange = function() {
    selection4.disabled = false;
    switch (selection1.value) {
        // Weapon Ascension
        case '0':
            selection2.disabled = true;
            selection3.disabled = false;
            selection2.value = "default";
            break;
        // Character Talent
        case '1':
            selection2.disabled = true;
            selection3.disabled = false;
            r_option5.disabled = true;
            selection4.value = "default";
            selection2.value = "default";
            break;
        // Normal Boss [Gems]
        case '2':
            w_option0.disabled = false;
            selection2.disabled = false;
            selection3.disabled = true;
            selection3.value = "default";
            break;
        // Weekly Boss [Gems]
        case '3':
            selection2.disabled = false;
            selection3.disabled = true;
            w_option0.disabled = true;
            selection2.value = "default";
            selection3.value = "default";
            break;
        // Default case
        default:
            selection2.disabled = true;
            selection3.disabled = true;
            selection4.disabled = true;
            selection2.value = "default";
            selection3.value = "default";
            selection4.value = "default";
            break;
    }
    t_selected = selection1.value;
};

// Ascension Gems
selection2.onchange = function () {
    var value = selection2.value;
    var disableOptions = (r2, r3, r4, r5) => {
        r_option2.disabled = r2;
        r_option3.disabled = r3;
        r_option4.disabled = r4;
        r_option5.disabled = r5;
    };
    if (selection1.value == 2) {  // Normal Boss [Gems]
        if (value == 0 || value == 1) {
            disableOptions(false, true, true, true);
        } else if (value == 2 || value == 3) {
            disableOptions(false, false, true, true);
        } else if (value == 4 || value == 5) {
            disableOptions(false, false, false, true);
        } else if (value >= 6 && value <= 8) {
            disableOptions(false, false, false, false);
        } else {
            selection4.value = "default";
        }
    } else if (selection1.value == 3) {  // Weekly Boss [Gems]
        if (value == 1) {
            disableOptions(false, true, true, true);
        } else if (value == 2 || value == 3) {
            disableOptions(false, false, true, true);
        } else if (value == 4 || value == 5) {
            disableOptions(false, false, false, true);
        } else if (value >= 6 && value <= 8) {
            disableOptions(false, false, false, false);
        } else {
            selection4.value = "default";
        }
    }
    w_selected = selection2.value;
};

// Domain Selection
selection3.onchange = function () {
    var value = selection3.value;
    var disableOptions = (r2, r3, r4, r5) => {
        r_option2.disabled = r2;
        r_option3.disabled = r3;
        r_option4.disabled = r4;
        r_option5.disabled = r5;
    };
    if (selection1.value == 0) {  // Weapon Ascension
        switch (value) {
            case '0':
                disableOptions(false, true, true, true);
                break;
            case '1':
                disableOptions(false, false, true, true);
                break;
            case '2':
                disableOptions(false, false, false, true);
                break;
            case '3':
                disableOptions(false, false, false, false);
                break;
            default:
                selection4.value = "default";
        }
    } else if (selection1.value == 1) {  // Character Talent
        switch (value) {
            case '0':
                disableOptions(false, true, true, true);
                break;
                case '1':
                    disableOptions(false, false, true, true);
                    break;
                    case '2':
                        disableOptions(false, false, true, true);
                        break;
                        case '3':
                            disableOptions(false, false, false, true);
                break;
            default:
                selection4.value = "default";
        }
    }
    d_selected = selection3.value;
};

selection4.onchange = function () {
    r_selected = selection4.value;
}


function countTurn(require, baseValue) {
    if (baseValue != 0) {
        let turn = 0;
        let sum  = 0;
        
        while (sum < require) {
            turn++;
            sum += baseValue;
        }
        return turn;
    }
    return 1;
}

procButton.addEventListener("click", function() {
    // Constant arrays (same as before)
    var weapon_min = [ /*...*/ ];
    var weapon_max = [ /*...*/ ];
    var talent_min = [ /*...*/ ];
    var talent_max = [ /*...*/ ];
    var nbGems_min = [ /*...*/ ];
    var nbGems_max = [ /*...*/ ];
    var wbGems_min = [ /*...*/ ];
    var wbGems_max = [ /*...*/ ];
    var rarity = [ "2 Star", "3 Star", "4 Star", "5 Star" ];

    // Clear previous output
    output_mat_max.innerHTML = "";
    output_mat_min.innerHTML = "";

    // Check if default options are selected
    var isDefaultSelectedTypeOption = (selection1.value) == 'default'; 
    var isDefaultSelectedWorldOption = (selection2.value) == 'default';
    var isDefaultSelectedDomainOption = (selection3.value) == 'default';
    var isDefaultSelectedRarityOption = (selection4.value) == 'default';
    var isDefaultInputValue = numberInput.value == '0';

    // Get the selected options
    let selectedTypeOption = parseInt(selection1.value); 
    let selectedWorldOption = parseInt(selection2.value);
    let selectedDomainOption = parseInt(selection3.value);
    let selectedRarityOption = parseInt(selection4.value);
    let inputValue = parseInt(numberInput.value);

    // Validity check
    var validForm = (
        !isDefaultSelectedTypeOption &&
        !isDefaultSelectedRarityOption &&
        (!isDefaultSelectedWorldOption || !isDefaultSelectedDomainOption) &&
        !isDefaultInputValue
    );

    if (validForm) {
        // Update output based on selected type option
        switch (selectedTypeOption) {
            case 0:
                output_mat_max.innerHTML = weaponMaxValue;
                output_mat_min.innerHTML = weaponMinValue;
                break;
            case 1:
                output_mat_max.innerHTML = talentMaxValue;
                output_mat_min.innerHTML = talentMinValue;
                break;
            case 2:
                output_mat_max.innerHTML = nbGemsMaxValue;
                output_mat_min.innerHTML = nbGemsMinValue;
                break;
            case 3:
                output_mat_max.innerHTML = wbGemsMaxValue;
                output_mat_min.innerHTML = wbGemsMinValue;
                break;
        }
        
        output_rarity.innerHTML = rarity[selectedRarityOption];
        output_turn_max.innerHTML = parseInt(output_mat_max.innerHTML) !== 0 ? countTurn(inputValue, parseInt(output_mat_max.innerHTML)) : "Try at least 1 more";
        output_turn_min.innerHTML = parseInt(output_mat_min.innerHTML) !== 0 ? countTurn(inputValue, parseInt(output_mat_min.innerHTML)) : "Try at least 1 more";
    }
});

