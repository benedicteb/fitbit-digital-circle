import getMonthShortName from "../common/getMonthShortName.js";
import { padNumber } from "../common/utils.js";

const mySettings = props => (
  <Page>
    <Select
      title="Choose a date format"
      label="Date format"
      settingsKey="dateFormat"
      options={[
        {
          name: `${getMonthShortName(
            new Date().getMonth()
          )} ${new Date().getDate()}`,
          format: "pretty"
        },
        {
          name: `${new Date().getFullYear()}-${padNumber(
            new Date().getMonth() + 1
          )}-${padNumber(new Date().getDate())}`,
          format: "utc"
        }
      ]}
    />
  </Page>
);

registerSettingsPage(mySettings);
