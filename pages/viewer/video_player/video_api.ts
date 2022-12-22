export class VideoApi {

    // This is a bit of a hack but it provides good insulation around
    // the unruly youtube javascript iframe API. A singleton div with an ID
    // of "the-video-container" is required in the DOM. 
    //
    // This API primarily offers three methods:
    //
    // VideoApi.loadVideo(videoId) //automatically plays
    // VideoApi.pauseVideo()
    // VideoApi.playVideo()

    private static ytPlayer: Promise<any>

    private static initialize(videoId?: string) {
        // TODO use types
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag: any = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.ytPlayer = new Promise(resolve => {
            window.onYouTubePlayerAPIReady = () => {
                let thePlayer: any;
                thePlayer = new YT.Player('the-video-container', {
                    videoId: videoId,
                    playerVars: {'enablejsapi': 1 },
                    events: {
                        'onReady': () => resolve(thePlayer)
                    }
                });
            };
        });
    }

    static async getPlayer(videoId?: string) {
        if (!this.ytPlayer) {
            this.initialize(videoId);
        }
        return this.ytPlayer;
    }

    public static async loadVideo(videoId: string) {
        (await this.getPlayer(videoId)).loadVideoById(videoId)
    }

    public static async pauseVideo() {
        (await this.getPlayer()).pauseVideo();
    }

    public static async playVideo() {
        (await this.getPlayer()).playVideo();
    }
}
