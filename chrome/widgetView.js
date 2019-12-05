function createPaymentContent(amount, accountA, accountB, currency) { 
    console.log(currency);
    var myString = `
    <div id = "templateContainer">
        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
                <!-- Amount: ${amount} -->

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="amount" value="${amount}">
                    <label class="mdl-textfield__label" for="amount">AMOUNT</label>
                </div>
            </div>
        </div>

        <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
            <div class="mdl-textfield mdl-js-textfield getmdl-select getmdl-select__fix-height mdl-textfield--floating-label">
                <input type="text" value="" class="mdl-textfield__input" id="currency" readonly>
                <input type="hidden" value="" name="currency">
                <!--            <i class="mdl-icon-toggle__label material-icons">face</i>    -->
                <label for="currency" class="mdl-textfield__label">CURRENCY</label>
                <ul for="currency" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                    <li class="mdl-menu__item" ${currency == 'ALL' ? 'data-selected="true"' : ""} data-val="ALL">ALL</li>
                    <li class="mdl-menu__item" ${currency == 'AFN' ? 'data-selected="true"' : ""} data-val="AFN">AFN</li>
                    <li class="mdl-menu__item" ${currency == 'ARN' ? 'data-selected="true"' : ""} data-val="ARN">ARN</li>
                    <li class="mdl-menu__item" ${currency == 'AWG' ? 'data-selected="true"' : ""} data-val="AWG">AWG</li>
                    <li class="mdl-menu__item" ${currency == 'AUD' ? 'data-selected="true"' : ""} data-val="AUD">AUD</li>
                    <li class="mdl-menu__item" ${currency == 'AZN' ? 'data-selected="true"' : ""} data-val="AZN">AZN</li>
                    <li class="mdl-menu__item" ${currency == 'BSD' ? 'data-selected="true"' : ""} data-val="BSD">BSD</li>
                    <li class="mdl-menu__item" ${currency == 'BBD' ? 'data-selected="true"' : ""} data-val="BBD">BBD</li>
                    <li class="mdl-menu__item" ${currency == 'BYN' ? 'data-selected="true"' : ""} data-val="BYN">BYN</li>
                    <li class="mdl-menu__item" ${currency == 'BZD' ? 'data-selected="true"' : ""} data-val="BZD">BZD</li>
                    <li class="mdl-menu__item" ${currency == 'BMD' ? 'data-selected="true"' : ""} data-val="BMD">BMD</li>
                    <li class="mdl-menu__item" ${currency == 'BOB' ? 'data-selected="true"' : ""} data-val="BOB">BOB</li>
                    <li class="mdl-menu__item" ${currency == 'BAM' ? 'data-selected="true"' : ""} data-val="BAM">BAM</li>
                    <li class="mdl-menu__item" ${currency == 'BWP' ? 'data-selected="true"' : ""} data-val="BWP">BWP</li>
                    <li class="mdl-menu__item" ${currency == 'BGN' ? 'data-selected="true"' : ""} data-val="BGN">BGN</li>
                    <li class="mdl-menu__item" ${currency == 'BRL' ? 'data-selected="true"' : ""} data-val="BRL">BRL</li>
                    <li class="mdl-menu__item" ${currency == 'BND' ? 'data-selected="true"' : ""} data-val="BND">BND</li>
                    <li class="mdl-menu__item" ${currency == 'KHR' ? 'data-selected="true"' : ""} data-val="KHR">KHR</li>
                    <li class="mdl-menu__item" ${currency == 'CAD' ? 'data-selected="true"' : ""} data-val="CAD">CAD</li>
                    <li class="mdl-menu__item" ${currency == 'KYD' ? 'data-selected="true"' : ""} data-val="KYD">KYD</li>
                    <li class="mdl-menu__item" ${currency == 'CLP' ? 'data-selected="true"' : ""} data-val="CLP">CLP</li>
                    <li class="mdl-menu__item" ${currency == 'CNY' ? 'data-selected="true"' : ""} data-val="CNY">CNY</li>
                    <li class="mdl-menu__item" ${currency == 'COP' ? 'data-selected="true"' : ""} data-val="COP">COP</li>
                    <li class="mdl-menu__item" ${currency == 'CRC' ? 'data-selected="true"' : ""} data-val="CRC">CRC</li>
                    <li class="mdl-menu__item" ${currency == 'HRK' ? 'data-selected="true"' : ""} data-val="HRK">HRK</li>
                    <li class="mdl-menu__item" ${currency == 'CUP' ? 'data-selected="true"' : ""} data-val="CUP">CUP</li>
                    <li class="mdl-menu__item" ${currency == 'CZK' ? 'data-selected="true"' : ""} data-val="CZK">CZK</li>
                    <li class="mdl-menu__item" ${currency == 'DKK' ? 'data-selected="true"' : ""} data-val="DKK">DKK</li>
                    <li class="mdl-menu__item" ${currency == 'DOP' ? 'data-selected="true"' : ""} data-val="DOP">DOP</li>
                    <li class="mdl-menu__item" ${currency == 'XCD' ? 'data-selected="true"' : ""} data-val="XCD">XCD</li>
                    <li class="mdl-menu__item" ${currency == 'EGP' ? 'data-selected="true"' : ""} data-val="EGP">EGP</li>
                    <li class="mdl-menu__item" ${currency == 'SVC' ? 'data-selected="true"' : ""} data-val="SVC">SVC</li>
                    <li class="mdl-menu__item" ${currency == 'EUR' ? 'data-selected="true"' : ""} data-val="EUR">EUR</li>
                    <li class="mdl-menu__item" ${currency == 'FKP' ? 'data-selected="true"' : ""} data-val="FKP">FKP</li>
                    <li class="mdl-menu__item" ${currency == 'FJD' ? 'data-selected="true"' : ""} data-val="FJD">FJD</li>
                    <li class="mdl-menu__item" ${currency == 'GHS' ? 'data-selected="true"' : ""} data-val="GHS">GHS</li>
                    <li class="mdl-menu__item" ${currency == 'GIP' ? 'data-selected="true"' : ""} data-val="GIP">GIP</li>
                    <li class="mdl-menu__item" ${currency == 'GTQ' ? 'data-selected="true"' : ""} data-val="GTQ">GTQ</li>
                    <li class="mdl-menu__item" ${currency == 'GGP' ? 'data-selected="true"' : ""} data-val="GGP">GGP</li>
                    <li class="mdl-menu__item" ${currency == 'GYD' ? 'data-selected="true"' : ""} data-val="GYD">GYD</li>
                    <li class="mdl-menu__item" ${currency == 'HNL' ? 'data-selected="true"' : ""} data-val="HNL">HNL</li>
                    <li class="mdl-menu__item" ${currency == 'HKD' ? 'data-selected="true"' : ""} data-val="HKD">HKD</li>
                    <li class="mdl-menu__item" ${currency == 'HUF' ? 'data-selected="true"' : ""} data-val="HUF">HUF</li>
                    <li class="mdl-menu__item" ${currency == 'ISK' ? 'data-selected="true"' : ""} data-val="ISK">ISK</li>
                    <li class="mdl-menu__item" ${currency == 'INR' ? 'data-selected="true"' : ""} data-val="INR">INR</li>
                    <li class="mdl-menu__item" ${currency == 'IDR' ? 'data-selected="true"' : ""} data-val="IDR">IDR</li>
                    <li class="mdl-menu__item" ${currency == 'IRR' ? 'data-selected="true"' : ""} data-val="IRR">IRR</li>
                    <li class="mdl-menu__item" ${currency == 'IMP' ? 'data-selected="true"' : ""} data-val="IMP">IMP</li>
                    <li class="mdl-menu__item" ${currency == 'ILS' ? 'data-selected="true"' : ""} data-val="ILS">ILS</li>
                    <li class="mdl-menu__item" ${currency == 'JMD' ? 'data-selected="true"' : ""} data-val="JMD">JMD</li>
                    <li class="mdl-menu__item" ${currency == 'JPY' ? 'data-selected="true"' : ""} data-val="JPY">JPY</li>
                    <li class="mdl-menu__item" ${currency == 'JEP' ? 'data-selected="true"' : ""} data-val="JEP">JEP</li>
                    <li class="mdl-menu__item" ${currency == 'KZT' ? 'data-selected="true"' : ""} data-val="KZT">KZT</li>
                    <li class="mdl-menu__item" ${currency == 'KPW' ? 'data-selected="true"' : ""} data-val="KPW">KPW</li>
                    <li class="mdl-menu__item" ${currency == 'KRW' ? 'data-selected="true"' : ""} data-val="KRW">KRW</li>
                    <li class="mdl-menu__item" ${currency == 'KGS' ? 'data-selected="true"' : ""} data-val="KGS">KGS</li>
                    <li class="mdl-menu__item" ${currency == 'LAK' ? 'data-selected="true"' : ""} data-val="LAK">LAK</li>
                    <li class="mdl-menu__item" ${currency == 'LBP' ? 'data-selected="true"' : ""} data-val="LBP">LBP</li>
                    <li class="mdl-menu__item" ${currency == 'LRD' ? 'data-selected="true"' : ""} data-val="LRD">LRD</li>
                    <li class="mdl-menu__item" ${currency == 'MKD' ? 'data-selected="true"' : ""} data-val="MKD">MKD</li>
                    <li class="mdl-menu__item" ${currency == 'MYR' ? 'data-selected="true"' : ""} data-val="MYR">MYR</li>
                    <li class="mdl-menu__item" ${currency == 'MUR' ? 'data-selected="true"' : ""} data-val="MUR">MUR</li>
                    <li class="mdl-menu__item" ${currency == 'MXN' ? 'data-selected="true"' : ""} data-val="MXN">MXN</li>
                    <li class="mdl-menu__item" ${currency == 'MNT' ? 'data-selected="true"' : ""} data-val="MNT">MNT</li>
                    <li class="mdl-menu__item" ${currency == 'MZN' ? 'data-selected="true"' : ""} data-val="MZN">MZN</li>
                    <li class="mdl-menu__item" ${currency == 'NAD' ? 'data-selected="true"' : ""} data-val="NAD">NAD</li>
                    <li class="mdl-menu__item" ${currency == 'NPR' ? 'data-selected="true"' : ""} data-val="NPR">NPR</li>
                    <li class="mdl-menu__item" ${currency == 'ANG' ? 'data-selected="true"' : ""} data-val="ANG">ANG</li>
                    <li class="mdl-menu__item" ${currency == 'NZD' ? 'data-selected="true"' : ""} data-val="NZD">NZD</li>
                    <li class="mdl-menu__item" ${currency == 'NIO' ? 'data-selected="true"' : ""} data-val="NIO">NIO</li>
                    <li class="mdl-menu__item" ${currency == 'NGN' ? 'data-selected="true"' : ""} data-val="NGN">NGN</li>
                    <li class="mdl-menu__item" ${currency == 'NOK' ? 'data-selected="true"' : ""} data-val="NOK">NOK</li>
                    <li class="mdl-menu__item" ${currency == 'OMR' ? 'data-selected="true"' : ""} data-val="OMR">OMR</li>
                    <li class="mdl-menu__item" ${currency == 'PKR' ? 'data-selected="true"' : ""} data-val="PKR">PKR</li>
                    <li class="mdl-menu__item" ${currency == 'PAB' ? 'data-selected="true"' : ""} data-val="PAB">PAB</li>
                    <li class="mdl-menu__item" ${currency == 'PYG' ? 'data-selected="true"' : ""} data-val="PYG">PYG</li>
                    <li class="mdl-menu__item" ${currency == 'PEN' ? 'data-selected="true"' : ""} data-val="PEN">PEN</li>
                    <li class="mdl-menu__item" ${currency == 'PHP' ? 'data-selected="true"' : ""} data-val="PHP">PHP</li>
                    <li class="mdl-menu__item" ${currency == 'PLN' ? 'data-selected="true"' : ""} data-val="PLN">PLN</li>
                    <li class="mdl-menu__item" ${currency == 'QAR' ? 'data-selected="true"' : ""} data-val="QAR">QAR</li>
                    <li class="mdl-menu__item" ${currency == 'RON' ? 'data-selected="true"' : ""} data-val="RON">RON</li>
                    <li class="mdl-menu__item" ${currency == 'RUB' ? 'data-selected="true"' : ""} data-val="RUB">RUB</li>
                    <li class="mdl-menu__item" ${currency == 'SHP' ? 'data-selected="true"' : ""} data-val="SHP">SHP</li>
                    <li class="mdl-menu__item" ${currency == 'SAR' ? 'data-selected="true"' : ""} data-val="SAR">SAR</li>
                    <li class="mdl-menu__item" ${currency == 'RSD' ? 'data-selected="true"' : ""} data-val="RSD">RSD</li>
                    <li class="mdl-menu__item" ${currency == 'SCR' ? 'data-selected="true"' : ""} data-val="SCR">SCR</li>
                    <li class="mdl-menu__item" ${currency == 'SGD' ? 'data-selected="true"' : ""} data-val="SGD">SGD</li>
                    <li class="mdl-menu__item" ${currency == 'SGD' ? 'data-selected="true"' : ""} data-val="SGD">SGD</li>
                    <li class="mdl-menu__item" ${currency == 'SBD' ? 'data-selected="true"' : ""} data-val="SBD">SBD</li>
                    <li class="mdl-menu__item" ${currency == 'SOS' ? 'data-selected="true"' : ""} data-val="SOS">SOS</li>
                    <li class="mdl-menu__item" ${currency == 'ZAR' ? 'data-selected="true"' : ""} data-val="ZAR">ZAR</li>
                    <li class="mdl-menu__item" ${currency == 'LKR' ? 'data-selected="true"' : ""} data-val="LKR">LKR</li>
                    <li class="mdl-menu__item" ${currency == 'SEK' ? 'data-selected="true"' : ""} data-val="SEK">SEK</li>
                    <li class="mdl-menu__item" ${currency == 'CHF' ? 'data-selected="true"' : ""} data-val="CHF">CHF</li>
                    <li class="mdl-menu__item" ${currency == 'SRD' ? 'data-selected="true"' : ""} data-val="SRD">SRD</li>
                    <li class="mdl-menu__item" ${currency == 'SYP' ? 'data-selected="true"' : ""} data-val="SYP">SYP</li>
                    <li class="mdl-menu__item" ${currency == 'TWD' ? 'data-selected="true"' : ""} data-val="TWD">TWD</li>
                    <li class="mdl-menu__item" ${currency == 'THB' ? 'data-selected="true"' : ""} data-val="THB">THB</li>
                    <li class="mdl-menu__item" ${currency == 'TTD' ? 'data-selected="true"' : ""} data-val="TTD">TTD</li>
                    <li class="mdl-menu__item" ${currency == 'TRY' ? 'data-selected="true"' : ""} data-val="TRY">TRY</li>
                    <li class="mdl-menu__item" ${currency == 'TVD' ? 'data-selected="true"' : ""} data-val="TVD">TVD</li>
                    <li class="mdl-menu__item" ${currency == 'UAH' ? 'data-selected="true"' : ""} data-val="UAH">UAH</li>
                    <li class="mdl-menu__item" ${currency == 'GBP' ? 'data-selected="true"' : ""} data-val="GBP">GBP</li>
                    <li class="mdl-menu__item" ${currency == 'USD' ? 'data-selected="true"' : ""} data-val="USD">USD</li>
                    <li class="mdl-menu__item" ${currency == 'UYU' ? 'data-selected="true"' : ""} data-val="UYU">UYU</li>
                    <li class="mdl-menu__item" ${currency == 'UZS' ? 'data-selected="true"' : ""} data-val="UZS">UZS</li>
                    <li class="mdl-menu__item" ${currency == 'VEF' ? 'data-selected="true"' : ""} data-val="VEF">VEF</li>
                    <li class="mdl-menu__item" ${currency == 'VND' ? 'data-selected="true"' : ""} data-val="VND">VND</li>
                    <li class="mdl-menu__item" ${currency == 'YER' ? 'data-selected="true"' : ""} data-val="YER">YER</li>
                    <li class="mdl-menu__item" ${currency == 'ZW' ? 'data-selected="true"' : ""} data-val="ZW">ZW</li>
                </ul>
            </div>
        </div>
    </div>


        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
                <!-- Account A: ${accountA} -->

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="accountA" value="${accountA}">
                    <label class="mdl-textfield__label" for="accountA">ACCOUNT A</label>
                </div>
            </div>
        </div>

        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
                <!-- Account B: ${accountB} -->

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="accountB" value="${accountB}">
                    <label class="mdl-textfield__label" for="accountB">ACCOUNT B</label>
                </div>
            </div>
        </div>

        <div class="mdl-grid" class="button-container">
            <button id="sendPayment" class="mdl-button mdl-js-button mdl-js-ripple-effect">
                SUBMIT
            </button>
        </div>

        <div id="demo-snackbar-example" class="mdl-js-snackbar mdl-snackbar">
            <div class="mdl-snackbar__text"></div>
            <button class="mdl-snackbar__action" type="button"></button>
        </div>
    </div>
    `

    return myString;
}