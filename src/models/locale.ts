// This is basically a data file,
// I don't particularly care about these lints
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines */

/**
 * A language/dialect code.
 *
 * Note that the vast majority of these are unsupported.
 * Unsupported languages/dialects will use a reasonable
 * fallback if available.
 */
enum Locale {
    /** Arabic */
    ar = "ar",
    /** Arabic (United Arab Emirates) */
    ar_AE = "ar_AE",
    /** Arabic (Bahrain) */
    ar_BH = "ar_BH",
    /** Arabic (Djibouti) */
    ar_DJ = "ar_DJ",
    /** Arabic (Algeria) */
    ar_DZ = "ar_DZ",
    /** Arabic (Egypt) */
    ar_EG = "ar_EG",
    /** Arabic (Western Sahara) */
    ar_EH = "ar_EH",
    /** Arabic (Eritrea) */
    ar_ER = "ar_ER",
    /** Arabic (Israel) */
    ar_IL = "ar_IL",
    /** Arabic (Iraq) */
    ar_IQ = "ar_IQ",
    /** Arabic (Jordan) */
    ar_JO = "ar_JO",
    /** Arabic (Comoros) */
    ar_KM = "ar_KM",
    /** Arabic (Kuwait) */
    ar_KW = "ar_KW",
    /** Arabic (Lebanon) */
    ar_LB = "ar_LB",
    /** Arabic (Libya) */
    ar_LY = "ar_LY",
    /** Arabic (Morocco) */
    ar_MA = "ar_MA",
    /** Arabic (Mauritania) */
    ar_MR = "ar_MR",
    /** Arabic (Oman) */
    ar_OM = "ar_OM",
    /** Arabic (Palestinian Territories) */
    ar_PS = "ar_PS",
    /** Arabic (Qatar) */
    ar_QA = "ar_QA",
    /** Arabic (Saudi Arabia) */
    ar_SA = "ar_SA",
    /** Arabic (Sudan) */
    ar_SD = "ar_SD",
    /** Arabic (Somalia) */
    ar_SO = "ar_SO",
    /** Arabic (South Sudan) */
    ar_SS = "ar_SS",
    /** Arabic (Syria) */
    ar_SY = "ar_SY",
    /** Arabic (Chad) */
    ar_TD = "ar_TD",
    /** Arabic (Tunisia) */
    ar_TN = "ar_TN",
    /** Arabic (Yemen) */
    ar_YE = "ar_YE",
    /** Assamese */
    as = "as",
    /** Assamese (India) */
    as_IN = "as_IN",
    /** Asu */
    asa = "asa",
    /** Asu (Tanzania) */
    asa_TZ = "asa_TZ",
    /** Azerbaijani */
    az = "az",
    /** Azerbaijani (Cyrillic) */
    az_Cyrl = "az_Cyrl",
    /** Azerbaijani (Cyrillic, Azerbaijan) */
    az_Cyrl_AZ = "az_Cyrl_AZ",
    /** Azerbaijani (Latin) */
    az_Latn = "az_Latn",
    /** Azerbaijani (Latin, Azerbaijan) */
    az_Latn_AZ = "az_Latn_AZ",
    /** Basaa */
    bas = "bas",
    /** Basaa (Cameroon) */
    bas_CM = "bas_CM",
    /** Belarusian */
    be = "be",
    /** Belarusian (Belarus) */
    be_BY = "be_BY",
    /** Bemba */
    bem = "bem",
    /** Bemba (Zambia) */
    bem_ZM = "bem_ZM",
    /** Bena */
    bez = "bez",
    /** Bena (Tanzania) */
    bez_TZ = "bez_TZ",
    /** Bulgarian */
    bg = "bg",
    /** Bulgarian (Bulgaria) */
    bg_BG = "bg_BG",
    /** Bambara */
    bm = "bm",
    /** Bambara (Mali) */
    bm_ML = "bm_ML",
    /** Bangla(bn) */
    bn = "bn",
    /** Bangla (Bangladesh) */
    bn_BD = "bn_BD",
    /** Bengali (India) */
    bn_IN = "bn_IN",
    /** Tibetan */
    bo = "bo",
    /** Tibetan (China) */
    bo_CN = "bo_CN",
    /** Tibetan (India) */
    bo_IN = "bo_IN",
    /** Breton */
    br = "br",
    /** Breton (France) */
    br_FR = "br_FR",
    /** Bodo */
    brx = "brx",
    /** Bodo (India) */
    brx_IN = "brx_IN",
    /** Bosnian */
    bs = "bs",
    /** Bosnian (Cyrillic) */
    bs_Cyrl = "bs_Cyrl",
    /** Bosnian (Cyrillic, Bosnia & Herzegovina) */
    bs_Cyrl_BA = "bs_Cyrl_BA",
    /** Bosnian (Latin) */
    bs_Latn = "bs_Latn",
    /** Bosnian (Latin, Bosnia & Herzegovina) */
    bs_Latn_BA = "bs_Latn_BA",
    /** Catalan */
    ca = "ca",
    /** Catalan (Andorra) */
    ca_AD = "ca_AD",
    /** Catalan (Spain) */
    ca_ES = "ca_ES",
    /** Catalan (France) */
    ca_FR = "ca_FR",
    /** Catalan (Italy) */
    ca_IT = "ca_IT",
    /** Chechen(ce) */
    ce = "ce",
    /** Chechen (Russia) */
    ce_RU = "ce_RU",
    /** Chiga(cgg) */
    cgg = "cgg",
    /** Chiga (Uganda) */
    cgg_UG = "cgg_UG",
    /** Cherokee */
    chr = "chr",
    /** Cherokee (United States) */
    chr_US = "chr_US",
    /** Czech */
    cs = "cs",
    /** Czech (Czech Republic) */
    cs_CZ = "cs_CZ",
    /** Welsh */
    cy = "cy",
    /** Welsh (United Kingdom) */
    cy_GB = "cy_GB",
    /** Danish */
    da = "da",
    /** Danish (Denmark) */
    da_DK = "da_DK",
    /** Taita */
    dav = "dav",
    /** Taita (Kenya) */
    dav_KE = "dav_KE",
    /** German */
    de = "de",
    /** German (Austria) */
    de_AT = "de_AT",
    /** German (Belgium) */
    de_BE = "de_BE",
    /** German (Switzerland) */
    de_CH = "de_CH",
    /** German (Germany) */
    de_DE = "de_DE",
    /** German (Italy) */
    de_IT = "de_IT",
    /** German (Liechtenstein) */
    de_LI = "de_LI",
    /** German (Luxembourg) */
    de_LU = "de_LU",
    /** Zarma */
    dje = "dje",
    /** Zarma (Niger) */
    dje_NE = "dje_NE",
    /** Lower Sorbian */
    dsb = "dsb",
    /** Lower Sorbian (Germany) */
    dsb_DE = "dsb_DE",
    /** Duala */
    dua = "dua",
    /** Duala (Cameroon) */
    dua_CM = "dua_CM",
    /** Jola-Fonyi */
    dyo = "dyo",
    /** Jola-Fonyi (Senegal) */
    dyo_SN = "dyo_SN",
    /** Dzongkha */
    dz = "dz",
    /** Dzongkha (Bhutan) */
    dz_BT = "dz_BT",
    /** Embu */
    ebu = "ebu",
    /** Embu (Kenya) */
    ebu_KE = "ebu_KE",
    /** Ewe(ee) */
    ee = "ee",
    /** Ewe (Ghana) */
    ee_GH = "ee_GH",
    /** Ewe (Togo) */
    ee_TG = "ee_TG",
    /** Greek */
    el = "el",
    /** Greek (Cyprus) */
    el_CY = "el_CY",
    /** Greek (Greece) */
    el_GR = "el_GR",
    /** English */
    en = "en",
    /** English (Antigua & Barbuda) */
    en_AG = "en_AG",
    /** English (Anguilla) */
    en_AI = "en_AI",
    /** English (American Samoa) */
    en_AS = "en_AS",
    /** English (Austria) */
    en_AT = "en_AT",
    /** English (Australia) */
    en_AU = "en_AU",
    /** English (Barbados) */
    en_BB = "en_BB",
    /** English (Belgium) */
    en_BE = "en_BE",
    /** English (Burundi) */
    en_BI = "en_BI",
    /** English (Bermuda) */
    en_BM = "en_BM",
    /** English (Bahamas) */
    en_BS = "en_BS",
    /** English (Botswana) */
    en_BW = "en_BW",
    /** English (Belize) */
    en_BZ = "en_BZ",
    /** English (Canada) */
    en_CA = "en_CA",
    /** English (Cocos [Keeling] Islands) */
    en_CC = "en_CC",
    /** English (Switzerland) */
    en_CH = "en_CH",
    /** English (Cook Islands) */
    en_CK = "en_CK",
    /** English (Cameroon) */
    en_CM = "en_CM",
    /** English (Christmas Island) */
    en_CX = "en_CX",
    /** English (Cyprus) */
    en_CY = "en_CY",
    /** English (Germany) */
    en_DE = "en_DE",
    /** English (Diego Garcia) */
    en_DG = "en_DG",
    /** English (Denmark) */
    en_DK = "en_DK",
    /** English (Dominica) */
    en_DM = "en_DM",
    /** English (Eritrea) */
    en_ER = "en_ER",
    /** English (Finland) */
    en_FI = "en_FI",
    /** English (Fiji) */
    en_FJ = "en_FJ",
    /** English (Falkland Islands) */
    en_FK = "en_FK",
    /** English (Micronesia) */
    en_FM = "en_FM",
    /** English (United Kingdom) */
    en_GB = "en_GB",
    /** English (Grenada) */
    en_GD = "en_GD",
    /** English (Guernsey) */
    en_GG = "en_GG",
    /** English (Ghana) */
    en_GH = "en_GH",
    /** English (Gibraltar) */
    en_GI = "en_GI",
    /** English (Gambia) */
    en_GM = "en_GM",
    /** English (Guam) */
    en_GU = "en_GU",
    /** English (Guyana) */
    en_GY = "en_GY",
    /** English (Hong Kong SAR China) */
    en_HK = "en_HK",
    /** English (Ireland) */
    en_IE = "en_IE",
    /** English (Israel) */
    en_IL = "en_IL",
    /** English (Isle of Man) */
    en_IM = "en_IM",
    /** English (India) */
    en_IN = "en_IN",
    /** English (British Indian Ocean Territory) */
    en_IO = "en_IO",
    /** English (Jersey) */
    en_JE = "en_JE",
    /** English (Jamaica) */
    en_JM = "en_JM",
    /** English (Kenya) */
    en_KE = "en_KE",
    /** English (Kiribati) */
    en_KI = "en_KI",
    /** English (St. Kitts & Nevis) */
    en_KN = "en_KN",
    /** English (Cayman Islands) */
    en_KY = "en_KY",
    /** English (St. Lucia) */
    en_LC = "en_LC",
    /** English (Liberia) */
    en_LR = "en_LR",
    /** English (Lesotho) */
    en_LS = "en_LS",
    /** English (Madagascar) */
    en_MG = "en_MG",
    /** English (Marshall Islands) */
    en_MH = "en_MH",
    /** English (Macau SAR China) */
    en_MO = "en_MO",
    /** English (Northern Mariana Islands) */
    en_MP = "en_MP",
    /** English (Montserrat) */
    en_MS = "en_MS",
    /** English (Malta) */
    en_MT = "en_MT",
    /** English (Mauritius) */
    en_MU = "en_MU",
    /** English (Malawi) */
    en_MW = "en_MW",
    /** English (Malaysia) */
    en_MY = "en_MY",
    /** Nepali (Nepal) */
    ne_NP = "ne_NP",
    /** English (Namibia) */
    en_NA = "en_NA",
    /** English (Norfolk Island) */
    en_NF = "en_NF",
    /** English (Nigeria) */
    en_NG = "en_NG",
    /** English (Netherlands) */
    en_NL = "en_NL",
    /** English (Nauru) */
    en_NR = "en_NR",
    /** English (Niue) */
    en_NU = "en_NU",
    /** English (New Zealand) */
    en_NZ = "en_NZ",
    /** English (Papua New Guinea) */
    en_PG = "en_PG",
    /** English (Philippines) */
    en_PH = "en_PH",
    /** English (Pakistan) */
    en_PK = "en_PK",
    /** English (Pitcairn Islands) */
    en_PN = "en_PN",
    /** English (Puerto Rico) */
    en_PR = "en_PR",
    /** English (Palau) */
    en_PW = "en_PW",
    /** English (Rwanda) */
    en_RW = "en_RW",
    /** English (Solomon Islands) */
    en_SB = "en_SB",
    /** English (Seychelles) */
    en_SC = "en_SC",
    /** English (Sudan) */
    en_SD = "en_SD",
    /** English (Sweden) */
    en_SE = "en_SE",
    /** English (Singapore) */
    en_SG = "en_SG",
    /** English (St. Helena) */
    en_SH = "en_SH",
    /** English (Slovenia) */
    en_SI = "en_SI",
    /** English (Sierra Leone) */
    en_SL = "en_SL",
    /** English (South Sudan) */
    en_SS = "en_SS",
    /** English (Sint Maarten) */
    en_SX = "en_SX",
    /** English (Swaziland) */
    en_SZ = "en_SZ",
    /** English (Turks & Caicos Islands) */
    en_TC = "en_TC",
    /** English (Tokelau) */
    en_TK = "en_TK",
    /** English (Tonga) */
    en_TO = "en_TO",
    /** English (Trinidad & Tobago) */
    en_TT = "en_TT",
    /** English (Tuvalu) */
    en_TV = "en_TV",
    /** English (Tanzania) */
    en_TZ = "en_TZ",
    /** English (Uganda) */
    en_UG = "en_UG",
    /** English (U.S. Outlying Islands) */
    en_UM = "en_UM",
    /** English (United States) */
    en_US = "en_US",
    /** English (St. Vincent & Grenadines) */
    en_VC = "en_VC",
    /** English (British Virgin Islands) */
    en_VG = "en_VG",
    /** English (U.S. Virgin Islands) */
    en_VI = "en_VI",
    /** English (Vanuatu) */
    en_VU = "en_VU",
    /** English (Samoa) */
    en_WS = "en_WS",
    /** English (South Africa) */
    en_ZA = "en_ZA",
    /** English (Zambia) */
    en_ZM = "en_ZM",
    /** English (Zimbabwe) */
    en_ZW = "en_ZW",
    /** Esperanto */
    eo = "eo",
    /** Spanish */
    es = "es",
    /** Spanish (Argentina) */
    es_AR = "es_AR",
    /** Spanish (Bolivia) */
    es_BO = "es_BO",
    /** Spanish (Brazil) */
    es_BR = "es_BR",
    /** Spanish (Belize) */
    es_BZ = "es_BZ",
    /** Spanish (Chile) */
    es_CL = "es_CL",
    /** Spanish (Colombia) */
    es_CO = "es_CO",
    /** Spanish (Costa Rica) */
    es_CR = "es_CR",
    /** Spanish (Cuba) */
    es_CU = "es_CU",
    /** Spanish (Dominican Republic) */
    es_DO = "es_DO",
    /** Spanish (Ceuta & Melilla */
    es_EA = "es_EA",
    /** Spanish (Ecuador) */
    es_EC = "es_EC",
    /** Spanish (Spain) */
    es_ES = "es_ES",
    /** Spanish (Equatorial Guinea) */
    es_GQ = "es_GQ",
    /** Spanish (Guatemala) */
    es_GT = "es_GT",
    /** Spanish (Honduras) */
    es_HN = "es_HN",
    /** Spanish (Canary Islands) */
    es_IC = "es_IC",
    /** Spanish (Mexico) */
    es_MX = "es_MX",
    /** Spanish (Nicaragua) */
    es_NI = "es_NI",
    /** Spanish (Panama) */
    es_PA = "es_PA",
    /** Spanish (Peru) */
    es_PE = "es_PE",
    /** Spanish (Puerto Rico) */
    es_PR = "es_PR",
    /** Spanish (Paraguay) */
    es_PY = "es_PY",
    /** Spanish (El Salvador) */
    es_SV = "es_SV",
    /** Spanish (United States) */
    es_US = "es_US",
    /** Spanish (Uruguay) */
    es_UY = "es_UY",
    /** Spanish (Venezuela) */
    es_VE = "es_VE",
    /** Estonian */
    et = "et",
    /** Estonian (Estonia) */
    et_EE = "et_EE",
    /** Basque(eu) */
    eu = "eu",
    /** Basque (Spain) */
    eu_ES = "eu_ES",
    /** Ewondo */
    ewo = "ewo",
    /** Ewondo (Cameroon) */
    ewo_CM = "ewo_CM",
    /** Persian */
    fa = "fa",
    /** Persian (Afghanistan) */
    fa_AF = "fa_AF",
    /** Persian (Iran) */
    fa_IR = "fa_IR",
    /** Fulah (Cameroon */
    ff_CM = "ff_CM",
    /** Pashto (Afghanistan) */
    ps_AF = "ps_AF",
    /** Fulah */
    ff = "ff",
    /** Fulah (Guinea) */
    ff_GN = "ff_GN",
    /** Fulah (Mauritania) */
    ff_MR = "ff_MR",
    /** Fulah (Senegal) */
    ff_SN = "ff_SN",
    /** Finnish */
    fi = "fi",
    /** Finnish (Finland) */
    fi_FI = "fi_FI",
    /** Filipino */
    fil = "fil",
    /** Filipino (Philippines) */
    fil_PH = "fil_PH",
    /** Faroese */
    fo = "fo",
    /** Faroese (Denmark) */
    fo_DK = "fo_DK",
    /** Faroese (Faroe Islands) */
    fo_FO = "fo_FO",
    /** French */
    fr = "fr",
    /** French (Belgium) */
    fr_BE = "fr_BE",
    /** French (Burkina Faso) */
    fr_BF = "fr_BF",
    /** French (Burundi) */
    fr_BI = "fr_BI",
    /** French (Benin) */
    fr_BJ = "fr_BJ",
    /** French (St. Barthélemy) */
    fr_BL = "fr_BL",
    /** French (Canada) */
    fr_CA = "fr_CA",
    /** French (Congo - Kinshasa) */
    fr_CD = "fr_CD",
    /** French (Central African Republic) */
    fr_CF = "fr_CF",
    /** French (Congo - Brazzaville) */
    fr_CG = "fr_CG",
    /** French (Switzerland) */
    fr_CH = "fr_CH",
    /** French (Côte d'Ivoire) */
    fr_CI = "fr_CI",
    /** French (Cameroon) */
    fr_CM = "fr_CM",
    /** French (Djibouti) */
    fr_DJ = "fr_DJ",
    /** French (Algeria) */
    fr_DZ = "fr_DZ",
    /** French (France) */
    fr_FR = "fr_FR",
    /** French (Gabon) */
    fr_GA = "fr_GA",
    /** French (French Guiana) */
    fr_GF = "fr_GF",
    /** French (Guinea) */
    fr_GN = "fr_GN",
    /** French (Guadeloupe) */
    fr_GP = "fr_GP",
    /** French (Equatorial Guinea) */
    fr_GQ = "fr_GQ",
    /** French (Haiti) */
    fr_HT = "fr_HT",
    /** French (Comoros) */
    fr_KM = "fr_KM",
    /** French (Luxembourg) */
    fr_LU = "fr_LU",
    /** French (Morocco) */
    fr_MA = "fr_MA",
    /** French (Monaco) */
    fr_MC = "fr_MC",
    /** French (St. Martin) */
    fr_MF = "fr_MF",
    /** French (Madagascar) */
    fr_MG = "fr_MG",
    /** French (Mali) */
    fr_ML = "fr_ML",
    /** French (Martinique) */
    fr_MQ = "fr_MQ",
    /** French (Mauritania) */
    fr_MR = "fr_MR",
    /** French (Mauritius) */
    fr_MU = "fr_MU",
    /** French (New Caledonia) */
    fr_NC = "fr_NC",
    /** French (Niger) */
    fr_NE = "fr_NE",
    /** French (French Polynesia) */
    fr_PF = "fr_PF",
    /** French (St. Pierre & Miquelon) */
    fr_PM = "fr_PM",
    /** French (Réunion) */
    fr_RE = "fr_RE",
    /** French (Rwanda) */
    fr_RW = "fr_RW",
    /** French (Seychelles) */
    fr_SC = "fr_SC",
    /** French (Senegal) */
    fr_SN = "fr_SN",
    /** French (Syria) */
    fr_SY = "fr_SY",
    /** French (Chad) */
    fr_TD = "fr_TD",
    /** French (Togo) */
    fr_TG = "fr_TG",
    /** French (Tunisia) */
    fr_TN = "fr_TN",
    /** French (Vanuatu) */
    fr_VU = "fr_VU",
    /** French (Wallis & Futuna) */
    fr_WF = "fr_WF",
    /** French (Mayotte) */
    fr_YT = "fr_YT",
    /** Friulian */
    fur = "fur",
    /** Friulian (Italy) */
    fur_IT = "fur_IT",
    /** Western Frisian */
    fy = "fy",
    /** Western Frisian (Netherlands) */
    fy_NL = "fy_NL",
    /** Irish */
    ga = "ga",
    /** Irish (Ireland) */
    ga_IE = "ga_IE",
    /** Scottish Gaelic */
    gd = "gd",
    /** Scottish Gaelic (United Kingdom) */
    gd_GB = "gd_GB",
    /** Galician */
    gl = "gl",
    /** Galician (Spain) */
    gl_ES = "gl_ES",
    /** Swiss German */
    gsw = "gsw",
    /** Swiss German (Switzerland) */
    gsw_CH = "gsw_CH",
    /** Swiss German (France) */
    gsw_FR = "gsw_FR",
    /** Swiss German (Liechtenstein) */
    gsw_LI = "gsw_LI",
    /** Gujarati */
    gu = "gu",
    /** Gujarati (India) */
    gu_IN = "gu_IN",
    /** Gusii */
    guz = "guz",
    /** Gusii (Kenya) */
    guz_KE = "guz_KE",
    /** Manx */
    gv = "gv",
    /** Manx (Isle of Man) */
    gv_IM = "gv_IM",
    /** Hausa */
    ha = "ha",
    /** Hausa (Ghana) */
    ha_GH = "ha_GH",
    /** Hausa (Niger) */
    ha_NE = "ha_NE",
    /** Hausa (Nigeria) */
    ha_NG = "ha_NG",
    /** Hawaiian */
    haw = "haw",
    /** Hawaiian (United States) */
    haw_US = "haw_US",
    /** Hebrew */
    he = "he",
    /** Hebrew (Israel) */
    he_IL = "he_IL",
    /** Hindi */
    hi = "hi",
    /** Hindi (India) */
    hi_IN = "hi_IN",
    /** Croatian */
    hr = "hr",
    /** Croatian (Bosnia & Herzegovina) */
    hr_BA = "hr_BA",
    /** Croatian (Croatia) */
    hr_HR = "hr_HR",
    /** Upper Sorbian */
    hsb = "hsb",
    /** Upper Sorbian (Germany) */
    hsb_DE = "hsb_DE",
    /** Hungarian */
    hu = "hu",
    /** Hungarian (Hungary) */
    hu_HU = "hu_HU",
    /** Armenian */
    hy = "hy",
    /** Armenian (Armenia) */
    hy_AM = "hy_AM",
    /** Igbo */
    ig = "ig",
    /** Igbo (Nigeria) */
    ig_NG = "ig_NG",
    /** Sichuan Yi */
    ii = "ii",
    /** Sichuan Yi (China) */
    ii_CN = "ii_CN",
    /** Indonesian */
    id = "id",
    /** Indonesian (Indonesia) */
    id_ID = "id_ID",
    /** Icelandic */
    is = "is",
    /** Icelandic (Iceland) */
    is_IS = "is_IS",
    /** Italian */
    it = "it",
    /** Italian (Switzerland) */
    it_CH = "it_CH",
    /** Italian (Italy) */
    it_IT = "it_IT",
    /** Italian (San Marino) */
    it_SM = "it_SM",
    /** Italian (Vatican City) */
    it_VA = "it_VA",
    /** Hebrew */
    iw = "iw",
    /** Hebrew (Israel) */
    iw_IL = "iw_IL",
    /** Japanese */
    ja = "ja",
    /** Japanese (Japan) */
    ja_JP = "ja_JP",
    /** Ngomba */
    jgo = "jgo",
    /** Ngomba (Cameroon) */
    jgo_CM = "jgo_CM",
    /** Machame */
    jmc = "jmc",
    /** Machame (Tanzania) */
    jmc_TZ = "jmc_TZ",
    /** Georgian */
    ka = "ka",
    /** Georgian (Georgia) */
    ka_GE = "ka_GE",
    /** Kabyle */
    kab = "kab",
    /** Kabyle (Algeria) */
    kab_DZ = "kab_DZ",
    /** Kamba */
    kam = "kam",
    /** Kamba (Kenya) */
    kam_KE = "kam_KE",
    /** Makonde */
    kde = "kde",
    /** Makonde (Tanzania) */
    kde_TZ = "kde_TZ",
    /** Kabuverdianu */
    kea = "kea",
    /** Malayalam (India) */
    ml_IN = "ml_IN",
    /** Kabuverdianu (Cape Verde) */
    kea_CV = "kea_CV",
    /** Koyra Chiini */
    khq = "khq",
    /** Koyra Chiini (Mali) */
    khq_ML = "khq_ML",
    /** Kikuyu */
    ki = "ki",
    /** Kikuyu (Kenya) */
    ki_KE = "ki_KE",
    /** Kazakh */
    kk = "kk",
    /** Kazakh (Kazakhstan) */
    kk_KZ = "kk_KZ",
    /** Kako */
    kkj = "kkj",
    /** Kako (Cameroon) */
    kkj_CM = "kkj_CM",
    /** Kalaallisut */
    kl = "kl",
    /** Kalaallisut (Greenland) */
    kl_GL = "kl_GL",
    /** Kalenjin */
    kln = "kln",
    /** Kalenjin (Kenya) */
    kln_KE = "kln_KE",
    /** Khmer */
    km = "km",
    /** Khmer (Cambodia) */
    km_KH = "km_KH",
    /** Kannada */
    kn = "kn",
    /** Kannada (India) */
    kn_IN = "kn_IN",
    /** Korean */
    ko = "ko",
    /** Korean (North Korea) */
    ko_KP = "ko_KP",
    /** Korean (South Korea) */
    ko_KR = "ko_KR",
    /** Konkani */
    kok = "kok",
    /** Konkani (India) */
    kok_IN = "kok_IN",
    /** Kashmiri */
    ks = "ks",
    /** Kashmiri (India) */
    ks_IN = "ks_IN",
    /** Shambala */
    ksb = "ksb",
    /** Shambala (Tanzania) */
    ksb_TZ = "ksb_TZ",
    /** Bafia */
    ksf = "ksf",
    /** Bafia (Cameroon) */
    ksf_CM = "ksf_CM",
    /** Colognian */
    ksh = "ksh",
    /** Colognian (Germany) */
    ksh_DE = "ksh_DE",
    /** Cornish */
    kw = "kw",
    /** Cornish (United Kingdom) */
    kw_GB = "kw_GB",
    /** Kyrgyz */
    ky = "ky",
    /** Kyrgyz (Kyrgyzstan) */
    ky_KG = "ky_KG",
    /** Langi */
    lag = "lag",
    /** Langi (Tanzania) */
    lag_TZ = "lag_TZ",
    /** Lithuanian */
    lt = "lt",
    /** Lithuanian (Lithuania) */
    lt_LT = "lt_LT",
    /** Luxembourgish */
    lb = "lb",
    /** Luxembourgish (Luxembourg) */
    lb_LU = "lb_LU",
    /** Latvian */
    lv = "lv",
    /** Latvian (Latvia) */
    lv_LV = "lv_LV",
    /** Ganda */
    lg = "lg",
    /** Ganda (Uganda) */
    lg_UG = "lg_UG",
    /** Macedonian */
    mk = "mk",
    /** Macedonian (Macedonia) */
    mk_MK = "mk_MK",
    /** Malay */
    ms = "ms",
    /** Malay (Malaysia) */
    ms_MY = "ms_MY",
    /** Maltese */
    mt = "mt",
    /** Maltese (Malta) */
    mt_MT = "mt_MT",
    /** Dutch */
    nl = "nl",
    /** Dutch (Belgium) */
    nl_BE = "nl_BE",
    /** Dutch (Netherlands) */
    nl_NL = "nl_NL",
    /** Norwegian */
    no = "no",
    /** Norwegian (Norway) */
    no_NO = "no_NO",
    /** Norwegian (Norway Nynorsk) */
    no_NO_NY = "no_NO_NY",
    /** Polish */
    pl = "pl",
    /** Polish (Poland) */
    pl_PL = "pl_PL",
    /** Portuguese */
    pt = "pt",
    /** Portuguese (Angola) */
    pt_AO = "pt_AO",
    /** Portuguese (Brazil) */
    pt_BR = "pt_BR",
    /** Portuguese (Switzerland) */
    pt_CH = "pt_CH",
    /** Portuguese (Cape Verde) */
    pt_CV = "pt_CV",
    /** Portuguese (Equatorial Guinea) */
    pt_GQ = "pt_GQ",
    /** Portuguese (Guinea-Bissau) */
    pt_GW = "pt_GW",
    /** Portuguese (Luxembourg) */
    pt_LU = "pt_LU",
    /** Portuguese (Macau SAR China) */
    pt_MO = "pt_MO",
    /** Portuguese (Mozambique) */
    pt_MZ = "pt_MZ",
    /** Portuguese (Portugal) */
    pt_PT = "pt_PT",
    /** Portuguese (São Tomé & Príncipe) */
    pt_ST = "pt_ST",
    /** Portuguese (Timor-Leste) */
    pt_TL = "pt_TL",
    /** Romanian */
    ro = "ro",
    /** Romanian (Romania) */
    ro_RO = "ro_RO",
    /** Russian */
    ru = "ru",
    /** Russian (Belarus) */
    ru_BY = "ru_BY",
    /** Russian (Kyrgyzstan) */
    ru_KG = "ru_KG",
    /** Russian (Kazakhstan) */
    ru_KZ = "ru_KZ",
    /** Russian (Moldova) */
    ru_MD = "ru_MD",
    /** Russian (Russia) */
    ru_RU = "ru_RU",
    /** Russian (Ukraine) */
    ru_UA = "ru_UA",
    /** Slovak */
    sk = "sk",
    /** Slovak (Slovakia) */
    sk_SK = "sk_SK",
    /** Slovenian */
    sl = "sl",
    /** Dari (Afghanistan) */
    prs_AF = "prs_AF",
    /** Slovenian (Slovenia) */
    sl_SI = "sl_SI",
    /** Albanian */
    sq = "sq",
    /** Albanian (Albania) */
    sq_AL = "sq_AL",
    /** Serbian */
    sr = "sr",
    /** Serbian (Bosnia and Herzegovina) */
    sr_BA = "sr_BA",
    /** Serbian (Serbia and Montenegro) */
    sr_CS = "sr_CS",
    /** Serbian (Montenegro) */
    sr_ME = "sr_ME",
    /** Albanian (Montenegro) */
    sq_ME = "sq_ME",
    /** Croatian (Montenegro) */
    hr_ME = "hr_ME",
    /** Bosnian (Montenegro) */
    bs_ME = "bs_ME",
    /** Serbian (Serbia) */
    sr_RS = "sr_RS",
    /** Swedish */
    sv = "sv",
    /** Swedish (Sweden) */
    sv_SE = "sv_SE",
    /** Thai */
    th = "th",
    /** Thai (Thailand) */
    th_TH = "th_TH",
    /** Thai (Thailand) */
    th_TH_TH = "th_TH_TH",
    /** Turkish */
    tr = "tr",
    /** Turkish (Turkey) */
    tr_TR = "tr_TR",
    /** Ukrainian */
    uk = "uk",
    /** Ukrainian (Ukraine) */
    uk_UA = "uk_UA",
    /** Vietnamese */
    vi = "vi",
    /** Vietnamese (Vietnam) */
    vi_VN = "vi_VN",
    /** Uzbek (Latin) */
    uz = "uz",
    /** Uzbek (Uzbekistan) */
    uz_UZ = "uz_UZ",
    /** Uzbek (Afghanistan) */
    uz_AF = "uz_AF",
    /** Chinese */
    zh = "zh",
    /** Chinese (Simplified)(zh-Hans) */
    zh_Hans = "zh_Hans",
    /** Chinese (Simplified, Hong Kong SAR China) */
    zh_Hans_HK = "zh_Hans_HK",
    /** Chinese (Simplified, Macau SAR China) */
    zh_Hans_MO = "zh_Hans_MO",
    /** Chinese (Simplified, Singapore) */
    zh_Hans_SG = "zh_Hans_SG",
    /** Chinese (Traditional) */
    zh_Hant = "zh_Hant",
    /** Chinese (Traditional, Hong Kong SAR China) */
    zh_Hant_HK = "zh_Hant_HK",
    /** Chinese (Traditional, Macau SAR China) */
    zh_Hant_MO = "zh_Hant_MO",
    /** Chinese (Traditional, Taiwan) */
    zh_Hant_TW = "zh_Hant_TW",
    /** Chinese (Simplified, China)(zh-Hans-CN) */
    zh_HK = "zh_HK",
    /** Zulu */
    zu = "zu",
    /** Zulu (South Africa) */
    zu_ZA = "zu_ZA",
}
export default Locale;
