//
//  RCTMessanger.m
//  marvel
//
//  Created by M Ikhsan Assaat on 25/09/2015.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "Messenger.h"
#import "RCTConvert.h"
#import "TSMessage.h"

@implementation RCTConvert (TSMessageNotificationType)

RCT_ENUM_CONVERTER(TSMessageNotificationType,
                   (
  @{
    @"MESSAGE" : @(TSMessageNotificationTypeMessage),
    @"WARNING" : @(TSMessageNotificationTypeWarning),
    @"ERROR" : @(TSMessageNotificationTypeError),
    @"SUCCESS" : @(TSMessageNotificationTypeSuccess)
    }
                   ),
                   TSMessageNotificationTypeSuccess,
                   integerValue);

@end

@implementation Messenger

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport {
  return @{
           @"MESSAGE" : @(TSMessageNotificationTypeMessage),
           @"WARNING" : @(TSMessageNotificationTypeWarning),
           @"ERROR" : @(TSMessageNotificationTypeError),
           @"SUCCESS" : @(TSMessageNotificationTypeSuccess)
           };
}

RCT_EXPORT_METHOD(showTitle:(NSString *)title subtitle:(NSString *)subtitle)
{
  [TSMessage showNotificationWithTitle:title subtitle:subtitle type:TSMessageNotificationTypeSuccess];
}

RCT_EXPORT_METHOD(showTitle:(NSString *)title subtitle:(NSString *)subtitle type:(TSMessageNotificationType)type)
{
  [TSMessage showNotificationWithTitle:title subtitle:subtitle type:type];
}

@end
