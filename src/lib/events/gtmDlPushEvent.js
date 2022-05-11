/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

const constants = require('../helpers/constants');

module.exports = function (settings, trigger) {
  if (!settings) return;

  const { method, valueIsRegex, eventKey } = settings;

  function handler(argEvent) {
    const eventModel =
      argEvent && argEvent.detail && argEvent.detail.eventModel;

    const result = {
      event: argEvent.detail
    };
    if (method !== constants.SPECIFICEVENT) {
      trigger(result);
      return;
    }

    const eventName = eventModel && eventModel.event;

    if (valueIsRegex) {
      const re = new RegExp(eventKey);
      if (String(eventName).match(re)) {
        trigger(result);
      }
    } else if (eventKey === eventName) {
      trigger(result);
    }
  }
  if (method === constants.ALLDATA) {
    document.body.addEventListener(constants.GDATA, handler);
  } else if (
    method === constants.ALLEVENTS ||
    (method === constants.SPECIFICEVENT && eventKey !== '')
  ) {
    document.body.addEventListener(constants.GEVENT, handler);
  }
};
