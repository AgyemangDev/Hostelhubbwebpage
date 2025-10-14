// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAgentData, saveAgentData, clearAgentData } from "../utils/agentStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // First check if we have cached agent data
                const cachedAgentData = getAgentData();
                
                if (cachedAgentData && cachedAgentData.uid === currentUser.uid) {
                    // Use cached data if it exists and matches current user
                    setUser(cachedAgentData);
                    setLoading(false);
                } else {
                    // Fetch fresh data if no cache or different user
                    try {
                        const studentRef = doc(db, "Student_Users", currentUser.uid);
                        const studentSnap = await getDoc(studentRef);
                        
                        if (studentSnap.exists()) {
                            const studentData = studentSnap.data();
                            
                            if (studentData.isEmployeeApplied && studentData.isAccepted) {
                                const employeeRef = doc(db, "Employees", currentUser.uid);
                                const employeeSnap = await getDoc(employeeRef);
                                const employeeData = employeeSnap.exists() ? employeeSnap.data() : {};
                                
                                const combined = {
                                    ...studentData,
                                    ...employeeData,
                                    uid: currentUser.uid,
                                    email: currentUser.email
                                };
                                
                                // Cache the agent data
                                saveAgentData(combined);
                                setUser(combined);
                            } else {
                                setUser(currentUser);
                            }
                        } else {
                            setUser(currentUser);
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        setUser(currentUser);
                    }
                    setLoading(false);
                }
            } else {
                // User is not authenticated, clear cached data
                clearAgentData();
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
