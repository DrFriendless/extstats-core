// this file lives in extstats-core.
// any copies of it anywhere else are temporary

import {FileToProcess} from "./admin-interfaces";

export interface SeriesMetadata {
  name: string;
  games: number[];
}

export const METADATA_RULE_BASEGAME = 1;

export interface MetadataRule {
  rule: number;
  game: number;
}

export interface Metadata {
  series: SeriesMetadata[];
  rules: MetadataRule[];
}

export interface ProcessCollectionResult {
  geek: string;
  items: CollectionGame[];
}

export interface CollectionGame {
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

export interface ProcessUserResult {
  geek: string;
  bggid: number;
  country: string;
  url: string;
}

export interface MonthPlayed {
  month: number;
  year: number;
}

export interface MonthPlayedData {
  geek: string;
  monthsPlayed: MonthPlayed[];
  url: string;
}

export interface PlayData {
  quantity: number;
  location: string;
  date: string;
  gameid: number;
  raters: number;
  ratingsTotal: number;
}

export interface ProcessPlaysResult {
  geek: string;
  month: number;
  year: number;
  plays: PlayData[];
  url: string;
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
  monthsData: MonthPlayedData;
}

export type PlaysResultMessage = {
  discriminator: "PlaysResultMessage";
  result: ProcessPlaysResult;
}

export type EnsureGamesMessage = {
  discriminator: "EnsureGamesMessage";
  gameIds: number[];
}

export type QueueMessage = UpdateUserListMessage | UpdateMetadataMessage | UpdateTop50Message | NoSuchGameMessage |
    GameResultMessage | UserResultMessage | CollectionResultMessage | MarkAsProcessedMessage | MarkAsUnprocessedMessage |
    MarkAsTryAgainMessage | CleanUpCollectionMessage | PlayedResultMessage | PlaysResultMessage | EnsureGamesMessage;