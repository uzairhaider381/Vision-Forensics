import React, { createContext, useContext, useState, useEffect } from 'react';
import { AI_MODELS } from '../services/aiRegistry';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    activeModelId: 'grok-3',
    activeModel: AI_MODELS[0],
    apiEndpoint: 'https://api.visionpro.ai/v2',
    securityLevel: 'Maximum',
    encryptionType: 'AES-256-GCM',
    firewallEnabled: true,
    lastBackup: new Date().toISOString()
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('app_config_advanced');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      const model = AI_MODELS.find(m => m.id === parsed.activeModelId) || AI_MODELS[0];
      setSettings({ ...parsed, activeModel: model });
    }
  }, []);

  const updateSettings = (newSettings) => {
    const model = AI_MODELS.find(m => m.id === (newSettings.activeModelId || settings.activeModelId)) || AI_MODELS[0];
    const updated = { ...settings, ...newSettings, activeModel: model };
    setSettings(updated);
    localStorage.setItem('app_config_advanced', JSON.stringify({
      activeModelId: updated.activeModelId,
      apiEndpoint: updated.apiEndpoint,
      securityLevel: updated.securityLevel,
      encryptionType: updated.encryptionType,
      firewallEnabled: updated.firewallEnabled
    }));
  };

  return (
    <ConfigContext.Provider value={{ settings, updateSettings, models: AI_MODELS }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
