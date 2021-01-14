function convert(){
    let classString = document.getElementById("textAreaInput").value;
    let outputClassString = document.getElementById("textAreaResult");
    // Pega a linha completa que inicia com "private"
    const regex = /private(...*);\n/gm;
    let variaveisBeforeSplit = classString.match(regex)
    let variaveisAfterSplit=[];
    let jsonAfterwork = "";

    //Cria um array de array do tipo e nome da variavel 
    variaveisBeforeSplit.forEach(element => {
        variaveisAfterSplit.push(element.split(" "))
    });

    //Cria o objeto e o json
   variaveisAfterSplit.forEach(element => {
    objeto = constroiObjeto(element[2].trim(),element[1])
    jsonAfterwork = jsonAfterwork.concat(JSON.stringify(objeto,null,4),",")
   });

   //insere no result
   outputClassString.value = jsonAfterwork;
}

//Retorna os tipo da maneira em que é necessario
function tratamentoType(nameTipoVariavel){

    switch(true) {
        case nameTipoVariavel.includes("Long"):
        return "long";
        
        case nameTipoVariavel.includes("String"):
        return "string";
        
        case nameTipoVariavel.includes("Integer"):
        return "int";
        
        case nameTipoVariavel.includes("Boolean"):
        return "boolean";
        
        case nameTipoVariavel.includes("LocalDate"):
        return "long";
        
        case nameTipoVariavel.includes("BigDecimal"):
        return "bigdecimal";
        
        case nameTipoVariavel.includes("List"):
        return {
            type: "array",
            items: {
            type: "record",
            name: "NomeEvent",
            namespace:"com.betha.saude.avro.CAMINHOEVENTO",
            fields: []
            },
            "java-class": "java.util.List"
        }

        default:
        return "long";
        
    }
}

//Constroi o Objeto de forma que se for um List ele monta diferente
function constroiObjeto(name,tipo){

    name = name.replace(";","");

    if(tipo.includes("List")){
        return { 
            name,
            type: tratamentoType(tipo)
            
        }
    }

    return{
        name,
        default: null,
        type: [null, tratamentoType(tipo) ]
    }
}