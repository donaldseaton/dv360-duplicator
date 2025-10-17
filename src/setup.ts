/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Config } from './config';
import { SheetUtils } from './sheet-utils';

export const Setup = {
  createMenu() {
    SpreadsheetApp.getUi()
      .createMenu(Config.Menu.Name)
      .addItem(
        Config.Menu.GenerateSDFForActiveSheet,
        'generateSDFForActiveSheet'
      )
      .addSeparator()
      .addItem(Config.Menu.ClearCache, 'clearCache')
      .addItem(Config.Menu.Install, 'setup')
      .addItem(Config.Menu.Help, 'showHelpPage')
      .addToUi();
  },

  setUpCampaignsSheet(partners: string[]) {
    const sheet = SheetUtils.getOrCreateSheet(
      Config.WorkingSheet.Campaigns
    ).activate();
    if (!sheet.getLastRow()) {
      sheet.getRange('A1:D1').setValues([Config.WorkingSheet.CampaignsHeaders]);

      sheet.getRange('A1:J1').setBackground('#a4c2f4').setFontWeight('bold');
    }

    // Add partners drop down
    SheetUtils.setRangeDropDown(sheet.getRange('A2:A'), partners);
  },
};
