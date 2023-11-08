

document.addEventListener("DOMContentLoaded", function() {
    
    let selectElement = document.getElementById("region");
    let selectedRegionElement = document.getElementById("selectedregion");

    // Lyt efter ændringer i select-elementet
    selectElement.addEventListener("change", function() {
        
        let selectedOption = selectElement.options[selectElement.selectedIndex];
        selectedRegionElement.textContent = selectedOption.textContent;
    });
});





