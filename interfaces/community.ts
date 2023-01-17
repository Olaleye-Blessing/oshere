export interface CommunityMetadata {
  coverPhoto: string;
  name: string;
  id: string;
}

export type ReceivedDate = {
  seconds: number;
  nanoseconds: number;
};

export type SentDate = Date;

export interface CommunityMessage {
  from: string;
  value: string;
  createdAt: ReceivedDate | SentDate;
}
