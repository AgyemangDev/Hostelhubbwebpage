// src/utils/agentStorage.js
/**
 * Utility functions for managing agent data in browser storage
 * This ensures agent data is cached and reused across the application
 */

const AGENT_DATA_KEY = 'hostelhubb_agent_data';
const AGENT_DATA_TIMESTAMP_KEY = 'hostelhubb_agent_data_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save agent data to localStorage with timestamp
 * @param {Object} agentData - The agent data object to cache
 */
export const saveAgentData = (agentData) => {
  try {
    const timestamp = Date.now();
    localStorage.setItem(AGENT_DATA_KEY, JSON.stringify(agentData));
    localStorage.setItem(AGENT_DATA_TIMESTAMP_KEY, timestamp.toString());
    console.log('Agent data saved to storage:', agentData);
  } catch (error) {
    console.error('Failed to save agent data to storage:', error);
  }
};

/**
 * Retrieve agent data from localStorage
 * @returns {Object|null} - The cached agent data or null if not found/expired
 */
export const getAgentData = () => {
  try {
    const cachedData = localStorage.getItem(AGENT_DATA_KEY);
    const timestamp = localStorage.getItem(AGENT_DATA_TIMESTAMP_KEY);
    
    if (!cachedData || !timestamp) {
      return null;
    }

    // Check if cache has expired
    const cacheAge = Date.now() - parseInt(timestamp);
    if (cacheAge > CACHE_DURATION) {
      console.log('Agent data cache expired, clearing storage');
      clearAgentData();
      return null;
    }

    const agentData = JSON.parse(cachedData);
    console.log('Agent data retrieved from storage:', agentData);
    return agentData;
  } catch (error) {
    console.error('Failed to retrieve agent data from storage:', error);
    return null;
  }
};

/**
 * Clear agent data from localStorage
 */
export const clearAgentData = () => {
  try {
    localStorage.removeItem(AGENT_DATA_KEY);
    localStorage.removeItem(AGENT_DATA_TIMESTAMP_KEY);
    console.log('Agent data cleared from storage');
  } catch (error) {
    console.error('Failed to clear agent data from storage:', error);
  }
};

/**
 * Update specific fields in the cached agent data
 * @param {Object} updates - Object containing fields to update
 */
export const updateAgentData = (updates) => {
  try {
    const currentData = getAgentData();
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      saveAgentData(updatedData);
      console.log('Agent data updated in storage:', updates);
      return updatedData;
    }
    return null;
  } catch (error) {
    console.error('Failed to update agent data in storage:', error);
    return null;
  }
};

/**
 * Check if agent data exists and is valid
 * @returns {boolean} - True if valid cached data exists
 */
export const hasValidAgentData = () => {
  const data = getAgentData();
  return data !== null && typeof data === 'object' && data.uid;
};

/**
 * Get agent data with fallback to API fetch
 * @param {Function} fetchFunction - Function to fetch agent data from API
 * @returns {Object|null} - Agent data from cache or API
 */
export const getAgentDataWithFallback = async (fetchFunction) => {
  // First try to get from cache
  const cachedData = getAgentData();
  if (cachedData) {
    return cachedData;
  }

  // If no cache, fetch from API and cache the result
  try {
    const freshData = await fetchFunction();
    if (freshData) {
      saveAgentData(freshData);
      return freshData;
    }
  } catch (error) {
    console.error('Failed to fetch fresh agent data:', error);
  }

  return null;
};

/**
 * Extract essential agent info for session reports
 * @param {Object} agentData - Full agent data object
 * @returns {Object} - Essential agent info for session reports
 */
export const getAgentSessionInfo = (agentData = null) => {
  const data = agentData || getAgentData();
  if (!data) return null;

  return {
    agentId: data.uid || data.agentId,
    agentCode: data.agentCode || '',
    agentName: data.displayName || data.name || data.agentName || '',
    agentIdNumber: data.agentIdNumber || data.employeeId || '',
    department: data.department || '',
    email: data.email || '',
    phoneNumber: data.phoneNumber || '',
    location: data.location || data.agentLocation || '',
    agentProfilePicture: data.agentProfilePicture || ''
  };
};