import firebase from "firebase/app";
import "firebase/analytics";
import {
  FirebaseApikey,
  AppID,
  AuthDomain,
  DatabaseURL,
  StorageBucket,
  ProjectID,
  MeasurementId,
  MessagingSenderId,
} from "../config/FirebaseConfig";

const firebaseConfig = {
  apiKey: FirebaseApikey,
  authDomain: AuthDomain,
  databaseURL: DatabaseURL,
  projectId: ProjectID,
  storageBucket: StorageBucket,
  appId: AppID,
  measurementId: MeasurementId,
  messagingSenderId: MessagingSenderId,
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
