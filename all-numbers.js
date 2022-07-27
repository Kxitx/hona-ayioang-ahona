const tsrezì = require('./test.json');

 for (let i = 0; i < tsrezì.length; i++) {
    if(tsrezì[i][0]!=toenglish(tsrezì[i][2])) {
        console.log(tsrezì[i][0] + ", " + tsrezì[i][2]);
        console.log(toenglish(tsrezì[i][2]));
    }
 }

function toenglish(zahl) {
    words=[["kew","'aw", "mune", "pxey", "tsìng", "mrr", "pukap", "kinä", "vol"], ["aw", "mun", "pey", "sìng", "mrr", "fu", "hin"], ["me", "pxe", "tsì", "mrr", "pu", "ki"], ["vol", "zam", "vozam", "zazam"], ["vo", "za", "voza", "zaza"]];
            const number = zahl;
            erg = 0;

            //Does what it actually should do, at least sometimes
            for (var i = 0; i < words[0].length-1; i++) {
                if(zahl===words[0][i]) {
                    erg = i;
                }  
            }

            for (var i = 0; i < words[1].length; i++) {
                if(zahl.endsWith(words[1][i])) {
                    erg = i+1;
                    zahl = zahl.substr(0, zahl.length-words[1][i].length);
                }  
            }
            var b = true;
            for (var i = 0; i < 4; i++) {
                if(zahl.endsWith(words[3][i]) || zahl.endsWith(words[4][i])) {
                    if(zahl.endsWith("vozazam") || zahl.endsWith("zazazam")) {
                        zahl = zahl.substr(0, zahl.length-3);
                        erg = erg + 64;
                    } else if(zahl.endsWith("vozaza") || zahl.endsWith("zazaza")) {
                        zahl = zahl.substr(0, zahl.length-2);
                        erg = erg + 64;
                    }else if(!((i===1) && (zahl.endsWith(words[3][i+2]) || zahl.endsWith(words[4][i+2]) || zahl.endsWith(words[3][i+1]) || zahl.endsWith(words[4][i+1])))) {
                        if(zahl.endsWith(words[3][i])) {
                            zahl = zahl.substr(0, zahl.length-words[3][i].length);
                        } else {
                            zahl = zahl.substr(0, zahl.length-words[4][i].length);
                        }
                    
                        for (var j = 0; j < words[2].length; j++) {
                            if(zahl.endsWith(words[2][j])) {
                                b = false;
                                zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                erg = erg + Math.pow(8, i+1)*(j+2);
                            }
                            if(j===5 && b) {
                                erg = erg + Math.pow(8, i+1);
                            }
                        }
                        b = true;
                    }  
                }
            }
            for (var i = 0; i < words[3].length; i++) {
                if(zahl.endsWith(words[3][i])) {
                    if(zahl.endsWith("vozazam") || zahl.endsWith("zazazam")) {
                        zahl = zahl.substr(0, zahl.length-3);
                        erg = erg + 64;
                    } else {
                        zahl = zahl.substr(0, zahl.length-words[3][i].length);
                        for (var j = 0; j < words[2].length; j++) {
                            if(zahl.endsWith(words[2][j])) {
                                zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                erg = erg + Math.pow(8, i+1)*(j+2);
                            }
                        }
                    }
                } else if(zahl.endsWith(words[4][i])) {
                    if(zahl.endsWith("vozaza") || zahl.endsWith("zazaza")) {
                        zahl = zahl.substr(0, zahl.length-2);
                        erg = erg + 64;
                    } else {
                        zahl = zahl.substr(0, zahl.length-words[4][i].length);
                        for (var j = 0; j < words[2].length; j++) {
                            for (var j = 0; j < words[2].length; j++) {
                                if(zahl.endsWith(words[2][j])) {
                                    zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                    erg = erg + Math.pow(8, i+1)*(j+2);
                                }
                            }
                        }
                    }
                }
            }
            return erg;

}