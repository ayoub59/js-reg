<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            font-size: 20px;
        }
        fieldset{
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        button{
            width: 200px;
        }

    </style>
</head>
<body onload="remplirConsole()">
    <fieldset>
        <label for="">Console</label>
        <select id="lstConsole">
            <option>Choisir un Console</option>
        </select>
        <label>Quantité</label>
        <input type="text" id="qte">
        <button type="button" onclick="add()">Ajouter au panier</button>
        <h1>Détails de commandes : </h1>
        <table id="T" border="1">
            <tr><th>Référence</th><th>Quantité</th><th>Image</th><th>Action</th></tr>
        </table>
        <div>
            <label for="">Total HT (DH) : </label>
            <label id="ht">0 dh</label>
        </div>
        <div>
            <label for="">Total TTC (DH) : </label>
            <label id="ttc">0 dh</label>
        </div>
        

        <button onclick="JSONSerialiser()">Commander</button>
    </fieldset>
</body>
</html>

<script>

    var txtJSON = '{"Consoles":[{"ref":"Nintendo switch","prix":4000,"manette":2,"image":"images/img1.png"},{"ref":"Play Station PS5","prix":8500,"manette":1,"image":"images/img2.png"},{"ref":"XBOX S512","prix":4600,"manette":2,"image":"images/img3.png"},{"ref":"Play Station PS$","prix":3500,"manette":1,"image":"images/img4.png"}]}';
    var objConsoles = JSON.parse(txtJSON);
    var T = document.querySelector("#T");
    var lblHT = document.getElementById("ht");
    var lblTTC = document.getElementById("ttc");
    var ht =0, ttc=0;

    var panier = new Array();
    //Q2

    var lstConsole = document.getElementById("lstConsole");
    var qte = document.getElementById("qte");


    function remplirConsole(){
       
       console.log(objConsoles);

       for(let i =0; i<objConsoles.Consoles.length; i++){
            var opt = document.createElement("option");
            opt.innerHTML=objConsoles.Consoles[i].ref;
            lstConsole.append(opt);
       }

    }
    function valider()
    {
        if(console.selectedIndex<1)
        {
            alert("choisir un console");
            return false;
        }
        if(isNaN(qte.value))
        {
            alert("La quantité doit etre une valeur numerique");
            return false;
        }
        if(qte.value>20 || qte.value <1)
        {
            alert("La quantité doit etre entre 1 et 20");
            return false;
        }
        return true;
    }


    function add()
    {
        var c;

        if(valider()==true)
        {

           for(let x of objConsoles.Consoles)
           {
            if(x.ref==lstConsole.value)
            {
                c=x;
            }
           }
           var ligne = document.createElement("tr");
           var cell0 = document.createElement("td");
           cell0.innerHTML=c.ref;
           var cell1 = document.createElement("td");
           cell1.innerHTML=qte.value;
           var cell2 = document.createElement("td");
           cell2.innerHTML="<img style='width:30%' src='"+c.image+"'>";
           var cell3 = document.createElement("td");
           cell3.innerHTML="<input type='button' value='supprimer' onclick='supprimer(this)'>" ;
           ligne.append(cell0);
           ligne.append(cell1);
           ligne.append(cell2);
           ligne.append(cell3);
           T.append(ligne);
           ht += c.prix*parseInt(qte.value);
           ttc = (ht+(ht*0.2));
           lblHT.innerHTML=ht +" Dhs ";
           lblTTC.innerHTML=ttc +" Dhs ";

           var obj = {code:c.ref, Qte:qte.value};
           panier.push(obj);
        }
    }
    function supprimer(elt){
        elt.parentNode.parentNode.remove();
    }


    function JSONSerialiser(){
        var PanierJson = JSON.stringify(panier);

        console.log(PanierJson);
    }
</script>
