import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StorageService } from "./_services/storage.service";
import { ChatgptService } from "./_services/chatgpt.service";

interface Message {
    content: string;
    author: 'user' | 'bot';
}

@Component({
    selector: 'model-window1',
    templateUrl: 'chatbotwindow.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css", '../styles.css', "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
        "../assets/vendor/css/owl.carousel.min.css", "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", "../assets/vendor/css/swiper.min.css"],
})
export class ChatBotComponent {
    messages: Message[] = [];
    inputMessage: string = '';
    constructor(public dialogRef: MatDialogRef<ChatBotComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}, private storageService: StorageService, public elem: ElementRef, public chatgptService: ChatgptService) {
            this.messages.push({content: "Hallo, met wat kan ik je helpen?", author: "bot"});
    }

    sendMessage(): void {
        if (!this.inputMessage.trim()) return;

        const newMessage: Message = {
            content: this.inputMessage,
            author: 'user'
        };

        this.messages.push(newMessage);

        // Reset input field after sending message
        this.inputMessage = '';

        // Simulate bot response
        this.chatgptService.sendChat(newMessage.content).subscribe(
            {
              next: data => {
                console.log(data)
                this.messages.push({
                    content: data.choices[0].message.content,
                    author: 'bot'
                });
             },
              error: err => {
                
              }
          });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}