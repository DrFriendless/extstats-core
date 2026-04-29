// this file lives in extstats-core.

import type {FileToProcess} from "./admin-interfaces.mjs";

export interface SeriesMetadataResult {
  name: string;
  games: number[];
}

export const METADATA_RULE_BASEGAME = 1;

export interface MetadataRuleResult {
  rule: number;
  game: number;
}

export interface Metadata {
  series: SeriesMetadataResult[];
  rules: MetadataRuleResult[];
}

export interface ProcessCollectionResult {
  geek: string;
  items: CollectionGameResult[];
}

export interface CollectionGameResult {
  gameId: number;
  rating: number;
  owned: boolean;
  forTrade: boolean;
  want: boolean;
  wantToPlay: boolean;
  wantToBuy: boolean;
  preordered: boolean;
  wishListPriority: number;
  prevOwned: boolean;
}

export interface ProcessGameResult {
  gameId: number;
  name: string;
  average: number;
  rank: number;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  usersRated: number;
  usersTrading: number;
  usersWanting: number;
  usersWishing: number;
  averageWeight: number;
  bayesAverage: number;
  numComments: number;
  expansion: number;
  usersOwned: number;
  subdomain: string;
  url: string;
  categories: string[];
  mechanics: string[];
  designers: number[];
  publishers: number[];
  expansions: number[];
}

export interface ProcessDesignerResult {
  bggid: number;
  name: string;
  url: string;
}

export interface ProcessPublisherResult {
  bggid: number;
  name: string;
  url: string;
}

export interface ProcessUserResult {
  geek: string;
  bggid: number;
  country: string;
  url: string;
}

export interface MonthPlayedResult {
  month: number;
  year: number;
}

export interface MonthPlayedDataResult {
  geek: string;
  monthsPlayed: MonthPlayedResult[];
  url: string;
}

export interface PlayDataResult {
  quantity: number;
  location: string;
  date: string;
  gameid: number;
  id: number;
}

export interface ProcessPlaysResult {
  geek: string;
  month: number;
  year: number;
  plays: PlayDataResult[];
  url: string;
}

export interface ProcessPlaysForPeriodResult {
  url: string;
  processMethod: string;
  geek: string;
  startYmdInc: string;
  endYmdInc: string;
  plays: PlayDataResult[];
}

export interface CleanUpCollectionResult {
  geek: string;
  url: string;
  items: number[];
}

export type ProcessMethod = "processCollection" | "processMarket" | "processPlayed" | "processGame" | "processTop50" | "processFrontPage" | "processUser" | "processPlays" | "processDesigner" | "processPublisher";

export type UpdateUserListMessage = {
  discriminator: "UpdateUserListMessage";
  users: string[];
}

export type NoSuchGeekMessage = {
  discriminator: "NoSuchGeekMessage";
  geek: string;
}

export type UpdateMetadataMessage = {
  discriminator: "UpdateMetadataMessage";
  metadata: Metadata
}

export type UpdateTop50Message = {
  discriminator: "UpdateTop50Message";
  top50: number[];
}

export type NoSuchGameMessage = {
  discriminator: "NoSuchGameMessage";
  gameId: number;
}

export type GameResultMessage = {
  discriminator: "GameResultMessage";
  result: ProcessGameResult;
}

export type UserResultMessage = {
  discriminator: "UserResultMessage";
  result: ProcessUserResult;
}

export type CollectionResultMessage = {
  discriminator: "CollectionResultMessage";
  result: ProcessCollectionResult;
}

export type MarkAsProcessedMessage = {
  discriminator: "MarkAsProcessedMessage";
  context: string;
  fileDetails: FileToProcess;
}

export type MarkAsUnprocessedMessage = {
  discriminator: "MarkAsUnprocessedMessage";
  context: string;
  fileDetails: FileToProcess;
}

export type MarkAsTryAgainMessage = {
  discriminator: "MarkAsTryAgainMessage";
  context: string;
  fileDetails: FileToProcess;
}

export type CleanUpCollectionMessage = {
  discriminator: "CleanUpCollectionMessage";
  params: CleanUpCollectionResult;
}

export type PlayedResultMessage = {
  discriminator: "PlayedResultMessage";
  monthsData: MonthPlayedDataResult;
}

export type PlaysForPeriodResultMessage = {
  discriminator: "PlaysForPeriodResultMessage";
  plays: ProcessPlaysForPeriodResult;
}

export type PlaysResultMessage = {
  discriminator: "PlaysResultMessage";
  result: ProcessPlaysResult;
}

export type DesignerResultMessage = {
  discriminator: "DesignerResultMessage";
  result: ProcessDesignerResult;
}

export type PublisherResultMessage = {
  discriminator: "PublisherResultMessage";
  result: ProcessPublisherResult;
}

export type EnsureGamesMessage = {
  discriminator: "EnsureGamesMessage";
  gameIds: number[];
}

export type SlowDownMessage = {
  discriminator: "SlowDownMessage";
}

export type MarkPlaysForPeriodProcessedMessage = {
  discriminator: "MarkPlaysForPeriodProcessed";
  url: string;
}

export type ReprocessPlaysMessage = {
  discriminator: "ReprocessPlays";
  geek: string;
}

export type RebuildMaterialisedViewsMessage = {
  discriminator: "RebuildMaterialisedViews";
}

export type QueueMessage = UpdateUserListMessage | UpdateMetadataMessage | UpdateTop50Message | NoSuchGameMessage |
    GameResultMessage | UserResultMessage | CollectionResultMessage | MarkAsProcessedMessage | MarkAsUnprocessedMessage |
    MarkAsTryAgainMessage | CleanUpCollectionMessage | PlayedResultMessage | PlaysResultMessage | EnsureGamesMessage |
    NoSuchGeekMessage | PlaysForPeriodResultMessage | SlowDownMessage | MarkPlaysForPeriodProcessedMessage |
    DesignerResultMessage | PublisherResultMessage | ReprocessPlaysMessage | RebuildMaterialisedViewsMessage;