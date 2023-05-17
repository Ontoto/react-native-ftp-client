
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNFtpClientSpec.h"

@interface FtpClient : NSObject <NativeFtpClientSpec>
#else
#import <React/RCTBridgeModule.h>

@interface FtpClient : NSObject <RCTBridgeModule>
#endif

@end
