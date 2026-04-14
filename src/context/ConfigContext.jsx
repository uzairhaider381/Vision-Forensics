import React, { createContext, useContext, useState } from 'react';
import { AI_MODELS } from '../services/aiRegistry';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('app_config_advanced');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        const model = AI_MODELS.find(m => m.id === parsed.activeModelId) || AI_MODELS[0];
        return { ...parsed, activeModel: model };
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    return {
      activeModelId: AI_MODELS[0].id,
      activeModel: AI_MODELS[0],
      apiEndpoint: 'https://api.visionpro.ai/v2',
      securityLevel: 'Maximum',
      encryptionType: 'AES-256-GCM',
      firewallEnabled: true,
      lastBackup: new Date().toISOString()
    };
  });

  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const model = AI_MODELS.find(m => m.id === (newSettings.activeModelId || prev.activeModelId)) || AI_MODELS[0];
      const updated = { ...prev, ...newSettings, activeModel: model };
      localStorage.setItem('app_config_advanced', JSON.stringify({
        activeModelId: updated.activeModelId,
        apiEndpoint: updated.apiEndpoint,
        securityLevel: updated.securityLevel,
        encryptionType: updated.encryptionType,
        firewallEnabled: updated.firewallEnabled
      }));
      return updated;
    });
  };

  return (
    <ConfigContext.Provider value={{ settings, updateSettings, models: AI_MODELS }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
