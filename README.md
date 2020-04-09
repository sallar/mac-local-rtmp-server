# Local RTMP Server for macOS

:warning: **Note:** Elgato has released a program called "OBS Link" which does the same thing (in a different way). You might want to [check that out](https://help.elgato.com/hc/en-us/articles/360031363132-OBS-Link-Setup). However I have noticed the same time lag in that method too.

This is a simple RTMP server for macOS. You can stream videos using the provided RTMP URI and also use the live feed in other applications.

![](https://user-images.githubusercontent.com/768052/38555984-c2961dba-3cd0-11e8-8f4e-49270e2278ce.png)

## Usage

1. Download the latest version from the [releases page](https://github.com/sallar/mac-local-rtmp-server/releases).
2. Once launched, the app sits in the menubar and runs on localhost (127.0.0.1).
3. At launch, a randomly generated streaming URI is displayed. The important portion is the `rtmp://127.0.0.1/live/` base, and the part afterwards can be anything as long as it's unique.
![](https://user-images.githubusercontent.com/2568736/41819405-dd699fac-778d-11e8-912b-1c2bdeb3258a.png)
4. To send a stream to the RTMP server, specify the  `rtmp://` URI of your choice, and paste it into the streaming software as a destination. For example, `rtmp://127.0.0.1/live/sallar`.
5. To send a stream from another device on the LAN, use Network Utility and specify the IP address of the local machine instead of localhost. For example, if the RTMP's machine's LAN address is `192.168.1.90`, specify the destination as `rtmp://192.168.1.90/live/sallar` from the other device.
6. As soon as the stream starts, the app's window shows the state of the stream and its live feed URI.
7. Note: multiple streams are supported! To view them, simply **scroll down** in the menubar.

## Additional

* [Video guide for connecting Elgato Game Capture HD60 S to OBS Studio](https://www.youtube.com/watch?v=n94jGIXWWZQ&feature=youtu.be)
* For using your phone or tablet as an RTMP source, check out [Larix Broadcaster](https://wmspanel.com/larix_broadcaster)

## License

This software is released under the [MIT License](LICENSE)

Thanks to [Arash](https://twitter.com/_arashasghari) for the design.
