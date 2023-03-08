import { Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import config from '../config';

export default function SelectableList (props) {
    const [DataActivities, setDataActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState("");
    const [data,setData] = useState([]);

    const handleActivitiesList = (val) => {
      setSelectedActivities(val);
      props.handleActivitiesList(val);
    };
    
    
    //console.log('Type de données SelectableList', type);
    useEffect(() => {
      fetch(`${config.URL_BACKEND}/settings/${props.type}`, {
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
   
    //console.log(selectedActivities);
   
    return (
      <MultipleSelectList
        placeholder="Choisir mes activités préférées"
        searchPlaceholder="Recherche"
        setSelected={(val) => handleActivitiesList(val)}
        data={data}
        save="value"
        label="Activités"
        boxStyles={{color:"#281C47", backgroundColor:"#DBD7E7", width:'100%'}}
        dropdownStyles={{color:"#FFF", backgroundColor:"#53496B"}}
        dropdownTextStyles={{color:"#FFF", backgroundColor:"#53496B"}}
        
        inputStyles={{color:"#281C47", backgroundColor:"#DBD7E7", fontSize:16}}
        checkBoxStyles={{color:"#281C47", backgroundColor:"#DBD7E7"}}
        badgeStyles={{color:"#FFF", backgroundColor:"#C398BC"}}
        badgeTextStyles={{color:"#281C47"}}
        labelStyles={{color:"#FFF", backgroundColor:"#FFF"}}
        maxHeight={300}
        
      />
    );
  };
