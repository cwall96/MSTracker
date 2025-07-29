import { firebaseAuth, firebaseData } from 'firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';


    const formatDateISO = (date) => {
      const isoString = date.toISOString();
      const formattedDate = isoString.split("T")[0];
      return formattedDate;
    }
  
    const currentDate = new Date();
  
    const splitName = (username) => {
      const shortened = username.split("@");
      shortened.length = 1;
      return shortened.toString();
    }

// this is the default func to store data on backend
    const updatedb = async (user,severity,impact,selectedA,selectedB) => {
      
      
      // days need to have both numbers returned, 2 != 29 so if data pertaining to day, don't truncate value
      if (severity.includes("Day")){
          
          
          if (selectedB !== "empty"){ // if using 2 datapoints, else: give param of selectedB as "empty"
            await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
              [severity] : Number(selectedA),// IDs have number + letter to distinguish severity
              [impact] : Number(selectedB.charAt(0))   // and impact, charAt to get only number
            }, { merge: true });
          }
            else{ // some pages only 3 datapoints
              await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
                [severity] : Number(selectedA),
              }, { merge: true });              
        }
      }
      else{
      {
        
        if (selectedB !== "empty"){
        await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
          [severity] : Number(selectedA.charAt(0)),
          [impact] : Number(selectedB.charAt(0))
        }, { merge: true });
      }
        else{ // some pages only 3 datapoints
          await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
            [severity] : Number(selectedA.charAt(0)),
          }, { merge: true });        
        }
      }
    } 
  }

// this func is used for screens with a yes/no and then corresponding text is returned on yes
    const updatedbFeedback = async (user,otherSymptomsName,feedbackTextName,isOtherSymptoms,feedbackText) => {
      
      

      if (isOtherSymptoms == 1){ // if they answered yes to feedback text
      await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
        [otherSymptomsName] : Number(isOtherSymptoms),
        [feedbackTextName] : {feedbackText}   
      }, { merge: true });}
      else{ // no feedback text
        await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
          [otherSymptomsName] : Number(isOtherSymptoms),
        }, { merge: true });}        
      }
    
//this func is used when the stored data is a string in 
      const updatedbMisc = async (user,key,value) => {
        await setDoc(doc(firebaseData, 'users', (user.email.concat(formatDateISO(currentDate)))), {
          [key] : value

        }, { merge: true });}
   

    const getdb = async (user,desiredDate) => {
      const checkData = await getDoc(doc(firebaseData, 'users', (user.email.concat(desiredDate))));
      return checkData.data();
      
    }
    
  



export {updatedb,updatedbFeedback, getdb,updatedbMisc, formatDateISO}

