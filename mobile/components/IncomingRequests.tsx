import React from 'react';
import styled from 'styled-components/native';
import {
  FriendRequestResponse,
  useAnswerFriendRequestMutation
} from '../generated/graphql';
import { Colors } from '../utils/styles/colors';
import { Button } from './Button';

const RootContainer = styled.View`
  width: 100%;
  background-color: ${Colors.darkBlue};
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Test = styled.View`
  margin-right: 10px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const Name = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  font-weight: 700;
`;

const Snus = styled.Text`
  font-size: 12px;
  color: ${Colors.white};
`;

interface IncomingRequestsProps {
  friendRequest: Omit<FriendRequestResponse, 'status'>;
}

export const IncomingRequest: React.FC<IncomingRequestsProps> = ({
  friendRequest
}) => {
  const [answerRequest, { data, loading }] = useAnswerFriendRequestMutation();

  const handleAnswer = async (answer: boolean) => {
    await answerRequest({ variables: { answer, friendsId: friendRequest.id } });
  };

  return (
    <RootContainer>
      <TextContainer>
        <Name>{friendRequest.displayName}</Name>
        <Snus>Granit vit stark</Snus>
      </TextContainer>
      <ButtonContainer>
        <Test>
          <Button text onPress={() => handleAnswer(false)}>
            Avböj
          </Button>
        </Test>
        <Button small align="left" onPress={() => handleAnswer(true)}>
          Acceptera
        </Button>
      </ButtonContainer>
    </RootContainer>
  );
};
