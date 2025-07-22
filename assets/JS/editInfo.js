document.addEventListener("DOMContentLoaded", function () {
  
  // ====================== VARIABLES (Local to this script) ======================
  const customerIdContainer = document.getElementById("customer-id-container");
  const surname = document.getElementById("surname");
  const otherName = document.getElementById("otherName");
  const mobileNo = document.getElementById("mobileNo");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const statu = document.getElementById("status");

  // ====================== STATE/CITY DATA (Consistent with registerCustomer.js) ======================
  const NG_STATES = ["-- Select State --", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"];
  const abia_cities = ["-- Select City --", "Aba", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umuahia"];
  const adamawa_cities = ["-- Select City --", "Ganye", "Gombi", "Hong", "Jada", "Lamurde", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"];
  const akwa_ibom_cities = ["-- Select City --", "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Ibeno", "Ibiono Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat Enin", "Nsit Atai", "Nsit Ibom", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Uruan", "Urue Offong/Oruko"];
  const anambra_cities = ["-- Select City --", "Aguata", "Anambra East", "Anambra North", "Anambra South", "Awka", "Awka North", "Awka South", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"];
  const bauchi_cities = ["-- Select City --", "Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Jama'are", "Katagum", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"];
  const bayelsa_cities = ["-- Select City --", "Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"];
  const benue_cities = ["-- Select City --", "Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Vandeikya"];
  const borno_cities = ["-- Select City --", "Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Gwoza", "Hawul", "Jere", "Kaga", "Konduga", "Mafa", "Magumeri", "Maiduguri", "Ngala", "Nganzai", "Shani"];
  const cross_river_cities = ["-- Select City --", "Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Calabar", "Central", "Ekureku", "Ikom", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"];
  const delta_cities = ["-- Select City --", "Aniocha North", "Aniocha South", "Asaba", "Ika North East", "Ika South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Warri North", "Warri South", "Warri South West"];
  const ebonyi_cities = ["-- Select City --", "Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Ohaozara", "Ohaukwu", "Onicha"];
  const edo_cities = ["-- Select City --", "Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Uhunmwonde"];
  const ekiti_cities = ["-- Select City --", "Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Ijero", "Ikole", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"];
  const enugu_cities = ["-- Select City --", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Oji River", "Udi", "Uzo Uwani"];
  const gombe_cities = ["-- Select City --", "Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"];
  const imo_cities = ["-- Select City --", "Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ihitte/Uboma", "Ikeduru", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwere", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Onuimo", "Orlu", "Owerri East", "Owerri West", "Unuimo"];
  const jigawa_cities = ["-- Select City --", "Auyo", "Babura", "Dutse", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Miga", "Ringim", "Sabon Gari", "Sule Tankarkar", "Yankwashi"];
  const kaduna_cities = ["-- Select City --", "Birnin Gwari", "Chikun", "Giwa", "Igabi", "Jaba", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zaria"];
  const kano_cities = ["-- Select City --", "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Dala", "Dawakin Kudu", "Dawakin Tofa", "Garko", "Garun Mallam", "Gaya", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Tarauni", "Tofa", "Tsanyawa", "Ungogo", "Warawa", "Wudil"];
  const katsina_cities = ["-- Select City --", "Bakori", "Batagarawa", "Batsari", "Baure", "Dandume", "Danja", "Dutsi", "Funtua", "Kafur", "Kaita", "Kankara", "Katsina", "Kurfi", "Malumfashi", "Mashi", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"];
  const kebbi_cities = ["-- Select City --", "Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Zuru"];
  const kogi_cities = ["-- Select City --", "Adavi", "Ajaokuta", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Kogi", "Lokoja", "Mopa-Muro", "Ofu", "Ogori-Magongo", "Okehi", "Okene", "Olamaboro", "Yagba East", "Yagba West"];
  const kwara_cities = ["-- Select City --", "Asa", "Baruten", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun"];
  const lagos_cities = ["-- Select City --", "Agege", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Somolu", "Surulere"];
  const nasarawa_cities = ["-- Select City --", "Akwanga", "Doma", "Keffi", "Karu", "Nasarawa", "Nasarawa Eggon", "Obi", "Toto"];
  const niger_cities = ["-- Select City --", "Agaie", "Agwara", "Bida", "Borgu", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mokwa", "Rafi", "Rijau", "Shiroro", "Suleja"];
  const ogun_cities = ["-- Select City --", "Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ifo", "Ijebu East", "Ijebu North", "Ijebu Ode", "Obafemi-Owode", "Odeda", "Odogbolu", "Remo North", "Sagamu"];
  const ondo_cities = ["-- Select City --", "Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Ese Odo", "Idanre", "Ifedore", "Ile Oluji/Okeigbo", "Ilaje", "Ondo East", "Ondo West", "Ose", "Owo"];
  const osun_cities = ["-- Select City --", "Aiyedaade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", "Ayedaade", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ife Central", "Ife East", "Ife North", "Ife South", "Ilesa East", "Ilesa West", "Isokan", "Obokun", "Odo Otin", "Oluyole", "Oriade", "Oshogbo"];
  const oyo_cities = ["-- Select City --", "Afijio", "Akinyele", "Atiba", "Ayede", "Babatunde", "Bodija", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Iseyin", "Itesiwaju", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Oyo East", "Oyo West"];
  const plateau_cities = ["-- Select City --", "Bokkos", "Bassa", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Pankshin", "Riyom", "Shendam", "Wase"];
  const rivers_cities = ["-- Select City --", "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Asari-Toru", "Bonny", "Degema", "Emohua", "Etche", "Ikwerre", "Obio-Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Port Harcourt", "Tai"];
  const sokoto_cities = ["-- Select City --", "Binji", "Bodinga", "Goronyo", "Gudu", "Illela", "Kebbe", "Kware", "Rabah", "Sokoto North", "Sokoto South", "Tambuwal", "Wamakko", "Wurno", "Yabo"];
  const taraba_cities = ["-- Select City --", "Ardo Kola", "Bali", "Donga", "Gassol", "Jalingo", "Karim Lamido", "Kona", "Lau", "Sunkani", "Wukari", "Yorro"];
  const yobe_cities = ["-- Select City --", "Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari"];
  const zamfara_cities = ["-- Select City --", "Anka", "Bakura", "Birnin Magaji", "Bukkuyum", "Gummi", "Kaura Namoda", "Maradun", "Shinkafi", "Talata Mafara", "Zamfara"];
  const fct_cities = ["-- Select City --", "Abaji", "Bwari", "Gwagwalada", "Kuje", "Abuja", "Nyanya", "Karshi"];

  // ====================== FUNCTIONS ======================
  
  function loadStates() {
    state.innerHTML = "";
    NG_STATES.forEach((x, index) => {
        const option = document.createElement("option");
        option.textContent = x;
        option.value = index;
        state.appendChild(option);
    });
  }

  function loadCities() {
    const stateIndex = parseInt(state.value);
    let cities = [];
    if (stateIndex === 1) cities = abia_cities;
    else if (stateIndex === 2) cities = adamawa_cities;
    else if (stateIndex === 3) cities = akwa_ibom_cities;
    else if (stateIndex === 4) cities = anambra_cities;
    else if (stateIndex === 5) cities = bauchi_cities;
    else if (stateIndex === 6) cities = bayelsa_cities;
    else if (stateIndex === 7) cities = benue_cities;
    else if (stateIndex === 8) cities = borno_cities;
    else if (stateIndex === 9) cities = cross_river_cities;
    else if (stateIndex === 10) cities = delta_cities;
    else if (stateIndex === 11) cities = ebonyi_cities;
    else if (stateIndex === 12) cities = edo_cities;
    else if (stateIndex === 13) cities = ekiti_cities;
    else if (stateIndex === 14) cities = enugu_cities;
    else if (stateIndex === 15) cities = gombe_cities;
    else if (stateIndex === 16) cities = imo_cities;
    else if (stateIndex === 17) cities = jigawa_cities;
    else if (stateIndex === 18) cities = kaduna_cities;
    else if (stateIndex === 19) cities = kano_cities;
    else if (stateIndex === 20) cities = katsina_cities;
    else if (stateIndex === 21) cities = kebbi_cities;
    else if (stateIndex === 22) cities = kogi_cities;
    else if (stateIndex === 23) cities = kwara_cities;
    else if (stateIndex === 24) cities = lagos_cities;
    else if (stateIndex === 25) cities = nasarawa_cities;
    else if (stateIndex === 26) cities = niger_cities;
    else if (stateIndex === 27) cities = ogun_cities;
    else if (stateIndex === 28) cities = ondo_cities;
    else if (stateIndex === 29) cities = osun_cities;
    else if (stateIndex === 30) cities = oyo_cities;
    else if (stateIndex === 31) cities = plateau_cities;
    else if (stateIndex === 32) cities = rivers_cities;
    else if (stateIndex === 33) cities = sokoto_cities;
    else if (stateIndex === 34) cities = taraba_cities;
    else if (stateIndex === 35) cities = yobe_cities;
    else if (stateIndex === 36) cities = zamfara_cities;
    else if (stateIndex === 37) cities = fct_cities;
    else cities = [];
    
    city.innerHTML = "";
    if (cities.length > 0) {
        cities.forEach(function (c) {
            const option = document.createElement("option");
            option.textContent = c;
            option.value = c;
            city.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.textContent = "-- Select City --";
        option.value = "";
        city.appendChild(option);
    }
  }

  function populateForm() {
    const customerIdToEdit = localStorage.getItem('customerIdToEdit');
    if (!customerIdToEdit) {
      alert("No customer selected for editing. Redirecting to dashboard.");
      window.location.href = 'index.html';
      return;
    }

    const customers = getFromStore('stat');
    const customerData = customers.find(c => c.customerId1 === customerIdToEdit);

    if (!customerData) {
      alert("Could not find customer data. Redirecting to dashboard.");
      window.location.href = 'index.html';
      return;
    }

    // Populate the readonly customer ID field
    customerIdContainer.innerHTML = `
        <label><i class="fa-solid fa-id-card-clip"></i> Customer Id</label>
        <input class="w3-input w3-border" type="text" value="${customerData.customerId1}" readonly />
    `;

    // Populate the rest of the form fields
    surname.value = customerData.surname1 || '';
    otherName.value = customerData.otherName1 || '';
    mobileNo.value = customerData.mobileNo1 || '';
    email.value = customerData.email1 || '';
    address.value = customerData.address1 || '';
    statu.value = customerData.statusId || '';

    // Correctly handle State and City dropdowns
    loadStates(); // First, load all possible states
    const stateIndex = NG_STATES.findIndex(s => s === customerData.stateId);
    if (stateIndex > -1) {
        state.value = stateIndex;
        loadCities(); // Then, load the cities for that specific state
        city.value = customerData.cityId || ''; // Finally, set the selected city
    }
  }
  
  function saveChanges() {
    // Re-use the validation logic from registerCustomer.js
    if (!validateInputs()) return;

    const customerIdToEdit = localStorage.getItem('customerIdToEdit');
    let customers = getFromStore('stat');
    
    // Find the index of the customer object we need to update
    const customerIndex = customers.findIndex(c => c.customerId1 === customerIdToEdit);

    if (customerIndex === -1) {
        alert("Error: Could not find the customer to update.");
        return;
    }

    // Update the customer object at that index with the new form values
    customers[customerIndex] = {
        ...customers[customerIndex], // Keep original ID and other non-form datnp
        surname1: surname.value,
        otherName1: otherName.value,
        mobileNo1: mobileNo.value,
        email1: email.value,
        address1: address.value,
        stateId: state.options[state.selectedIndex].text,
        cityId: city.options[city.selectedIndex].text,
    };
    
    // Save the entire modified array back to localStorage
    localStorage.setItem('stat_array', JSON.stringify(customers));

    // Clean up and redirect
    localStorage.removeItem('customerIdToEdit');
    alert("Customer information updated successfully!");
    window.location.href = "index.html";
  }

  function validateInputs() {
    if (surname.value === "" || surname.value.length < 2) {
      alert("Please enter a valid surname (at least 2 characters)");
      return false;
    }
    if (otherName.value === "" || otherName.value.length < 2) {
      alert("Please enter valid other names (at least 2 characters)");
      return false;
    }
    if (!isMobileNoValid(mobileNo)) return false;
    if (!isEmailValid(email)) return false;
    if (address.value === "" || address.value.length < 5) {
      alert("Please enter a valid address (at least 5 characters)");
      return false;
    }
    if (state.value === "0" || state.value === "-- Select State --") {
      alert("Please select a state");
      return false;
    }
    if (city.value === "0" || city.value === "-- Select City --") {
      alert("Please select a city");
      return false;
    }
    return true;
  }
  
  function isMobileNoValid(mobileNo) {  
      if (mobileNo.value === "") {
        alert("Please enter your mobile number");
        return false;
      }
      if (mobileNo.value.length !== 11) {
        alert("Mobile number must be 11 digits");
        return false;
      }
      const chkArry = ["080", "081", "090", "091", "070", "071"];
      if (!chkArry.includes(mobileNo.value.substring(0, 3))) {
        alert("Please enter a valid Nigerian mobile number");
        return false;
      }
      return true;
    }

    function isEmailValid(email) {
      if (email.value === "" || email.value.length < 5) {
        alert("Please enter a valid email address");
        return false;
      }
      if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
        alert("Please enter a valid email address");
        return false;
      }
      return true;
    }

  // ====================== INITIALIZATION & EVENT LISTENERS ======================
  populateForm();
  state.addEventListener("change", loadCities);
  document.getElementById("btnSaveChanges").addEventListener("click", saveChanges);
});