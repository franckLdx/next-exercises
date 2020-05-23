import react from "react";
import { LaunchRocketResult } from "@services/launches";
import { Separator } from "@components/Separator";
import { MyNextLink } from "@components/MyNextLink";
import { getLaunchUrl } from "@lib/url";
import { formatDate } from "@lib/misc";
import { List, ListItem, Box, Text } from "@chakra-ui/core";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";
import StyledSystem from "styled-system";

type Props = StyledSystem.MarginTopProps & {
  launches: Array<LaunchRocketResult>
}

export const Launches: React.FC<Props> = ({ launches, ...props }) => {
  return (
    <Box {...props}>
      <Separator>Launches</Separator>
      <List marginTop="2" styleType="disc">
        {launches.map(launch =>
          <SkeletonOnLoading key={launch.id}>
            <ListItem>
              <MyNextLink href={getLaunchUrl(launch.id)}>
                {launch.mission_name} - {formatDate(launch.launch_date_utc)}
              </MyNextLink>
            </ListItem>
          </SkeletonOnLoading>
        )}
      </List>
      {launches.length === 0 ?
        <SkeletonOnLoading><Text marginTop="2" marginX="3">No Launch yet !</Text></SkeletonOnLoading>
        :
        <></>
      }
    </Box>
  )
};
