import { Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import config from '../config';

export default function SelectableList ({type}) {
    const [DataActivities, setDataActivities] = useState([]);
    const [selected, setSelected] = useState("");
    const [data,setData] = useState([]);
    
    //console.log('Type de données SelectableList', type);
    useEffect(() => {
      fetch(`${config.URL_BACKEND}/settings/${type}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.activities);
          if (data.result) {
            // console.log("fetch Activities", data.props.type);
            let newArray = data.data.map((data,i) => {
              return { key:i, value: data.name, disabled: false };
            });
            setData(newArray);
            
          }
        });
    }, []);
    return (
      <MultipleSelectList
        searchPlaceholder="Rechercher des activités"
        setSelected={setSelected}
        data={data}
        save="value"
        label="Activitésssssss"
        boxStyles={{color:"#FFF", backgroundColor:"#fff"}}
        dropdownStyles={{color:"#FFF", backgroundColor:"#53496B"}}
        dropdownTextStyles={{color:"#FFF", backgroundColor:"#53496B"}}
        inputStyles={{color:"#FFF", backgroundColor:"#fff"}}
        checkBoxStyles={{color:"#FFF", backgroundColor:"#FFF"}}
        badgeStyles={{color:"#FFF", backgroundColor:"#C398BC"}}
        badgeTextStyles={{color:"#281C47"}}
        labelStyles={{color:"#FFF", backgroundColor:"#FFF"}}
        maxHeight={200}
      />
    );
  };
