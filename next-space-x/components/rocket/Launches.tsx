import react from "react";
import { LaunchRocketResult } from "@services/launches";
import { Separator } from "@components/Separator";
import { MyNextLink } from "@components/MyNextLink";
import { getLaunchUrl } from "@lib/url";
import { formatDate } from "@lib/misc";
import { List, ListItem, Box, Text } from "@chakra-ui/core";
import StyledSystem from "styled-system";

type Props = StyledSystem.MarginProps & {
  launches: Array<LaunchRocketResult>
}

export const Launches: React.FC<Props> = ({ launches, ...props }) => {
  return (
    <Box {...props}>
      <Separator>Launches</Separator>
      <List marginTop="2" styleType="disc">
        {launches.map(launch =>
          <ListItem key={launch.id}>
            <MyNextLink href={getLaunchUrl(launch.id)}>
              {launch.mission_name} - {formatDate(launch.launch_date_utc)}
            </MyNextLink>
          </ListItem>
        )}
      </List>
      {launches.length === 0 ? <Text marginTop="2" marginX="3">No Launch yet !</Text> : <></>}
    </Box>
  )
};
