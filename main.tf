# Security Group
resource "aws_security_group" "ec2-sg" {
    name          = "instance-security-group"
    description   = "Allow inbound traffic"
    vpc_id        = data.aws_vpc.default-vpc.id
}

resource "aws_security_group_rule" "allow_http_inbound" {
    type              = "ingress"
    security_group_id = aws_security_group.ec2-sg.id

    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    source_security_group_id = aws_security_group.alb_sg.id
}
resource "aws_security_group_rule" "allow_ssh_inbound" {
    type              = "ingress"
    security_group_id = aws_security_group.ec2-sg.id

    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    source_security_group_id = aws_security_group.alb_sg.id
}

resource "aws_security_group_rule" "allow_http_outbound" {
    type              = "egress"
    security_group_id = aws_security_group.ec2-sg.id

    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
}
Security Group nur für die Testinstanz
resource "aws_security_group" "ec2-sg-public" {
    name          = "public-security-group"
    description   = "Allow inbound traffic"
    vpc_id        = data.aws_vpc.default-vpc.id
}

resource "aws_security_group_rule" "allow_http_inbound-public" {
    type              = "ingress"
    security_group_id = aws_security_group.ec2-sg-public.id

    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
resource "aws_security_group_rule" "allow_ssh_inbound-public" {
    type              = "ingress"
    security_group_id = aws_security_group.ec2-sg-public.id

    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_http_outbound-public" {
    type              = "egress"
    security_group_id = aws_security_group.ec2-sg-public.id

    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
}

# LB Security Group
resource "aws_security_group" "alb_sg"{
    name           = "alb_sg"
    vpc_id        = data.aws_vpc.default-vpc.id
}

resource "aws_security_group_rule" "allow_http_inbound_alb" {
    type              = "ingress"
    security_group_id = aws_security_group.alb_sg.id

    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_http_outbound_alb" {
    type              = "egress"
    security_group_id = aws_security_group.alb_sg.id

    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}

# target group
resource "aws_lb_target_group" "web_tg" {
    name     = "web-tg"
    port     = 80
    protocol = "HTTP"
    vpc_id   = data.aws_vpc.default-vpc.id
}
# Load Balancer erstellen
resource "aws_lb" "web_alb" {
    name               = "web-alb"
    internal           = false
    load_balancer_type = "application"
    security_groups    = [aws_security_group.alb_sg.id]
    enable_deletion_protection = false

    enable_cross_zone_load_balancing   = true
    enable_http2                       = true
    idle_timeout                       = 60

    subnets = [data.aws_subnet.public_subnet_1.id, data.aws_subnet.public_subnet_2.id]

}
# ALB Listener
resource "aws_lb_listener" "web_listener" {
    load_balancer_arn = aws_lb.web_alb.arn
    port              = "80"
    protocol          = "HTTP"

    default_action {
        type             = "forward"
        target_group_arn = aws_lb_target_group.web_tg.arn
    }
}

# Register EC2 instances with ALB Target Group
resource "aws_autoscaling_attachment" "instances" {
    autoscaling_group_name = aws_autoscaling_group.web_asg.name
    lb_target_group_arn   = aws_lb_target_group.web_tg.arn
}


# Auto Scaling Group
resource "aws_autoscaling_group" "web_asg" {
    name                 = "web-asg"
    launch_configuration = aws_launch_configuration.web_lc.name
    min_size             = 1
    max_size             = 4
    desired_capacity     = 1
    vpc_zone_identifier  = [data.aws_subnet.private_subnet_1.id, data.aws_subnet.private_subnet_2.id]

    target_group_arns    = [aws_lb_target_group.web_tg.arn]

    tag {
        key                 = "Name"
        value               = "web-asg-instance"
        propagate_at_launch = true
    }
}

# ###Definition EC2 Instance Public
# resource "aws_instance" "matze_ec2" {
#     ami             = "ami-0766f68f0b06ab145" 
#     instance_type   = "t2.micro"
#     vpc_security_group_ids = [aws_security_group.ec2-sg-public.id]
#     subnet_id     = "subnet-047f215306f8cebfb"
#     key_name        = "private-ec2-spielwiese"
#     user_data = <<-EOT
#                 #!/bin/bash
#                     sudo su
#                     yum update -y
#                     yum install httpd -y
#                     systemctl start httpd
#                     systemctl enable httpd
#                 EOT
    


#     provisioner "file" {
#             source      = "./index.html"
#             destination = "/home/ec2-user/index.htm"
        
#         connection {
#         type        = "ssh"
#         user        = "ec2-user"
#         private_key = "${file("./private-ec2-spielwiese.pem")}"
#         host        = "${self.public_ip}"
#         }
#     }

#     tags = {
#         Name = "Testinstanz"
#     }
# }

# Launch Configuration für die Autoskaling Group
resource "aws_launch_configuration" "web_lc" {
    name          = "web-lc"
    image_id      = "ami-04e601abe3e1a910f"
    instance_type = "t2.micro"

    security_groups = [aws_security_group.ec2-sg.id]
    key_name        = "private-ec2-spielwiese"

    user_data       = <<-EOT
                #!/bin/bash
                
                mkdir -p /var/www/html
                echo '<!DOCTYPE html>
                <html lang="de">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Kontakt Schraube24</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }

                        h1 {
                            text-align: center;
                            text-transform: uppercase;
                            font-size: 40px;
                            background-color: #4ca5af;
                            color: white;
                            padding: 20px;
                        }

                        h2 {
                            text-align: center;
                        }

                        form {
                            max-width: 500px;
                            margin: 0 auto;
                        }

                        .form-group {
                            margin-bottom: 20px;
                        }

                        .form-group label {
                            display: block;
                            margin-bottom: 5px;
                            font-weight: bold;
                        }

                        .form-group input,
                        .form-group textarea {
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            box-sizing: border-box;
                        }

                        .form-group .error {
                            border-color: red;
                        }

                        .form-group .error-message {
                            color: red;
                            margin-top: 5px;
                        }

                        .form-group input[type="file"] {
                            padding: 5px 10px;
                        }

                        .form-group textarea {
                            height: 150px;
                        }

                        .form-group button {
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }

                        .form-group button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>

                <body>
                    <h1>Schraube24</h1>
                    <h2>Kontaktformular</h2>
                    <form id="contactForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="firstName">Vorname:</label>
                            <input type="text" id="firstName" placeholder="Max" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Nachname:</label>
                            <input type="text" id="lastName" placeholder="Mustermann" required>
                        </div>
                        <div class="form-group">
                            <label for="email">E-Mail-Adresse:</label>
                            <input type="email" id="email" placeholder="max.mustermann@me.com" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Telefonnummer:</label>
                            <input type="tel" id="phone" placeholder="+49 123 456 789">
                        </div>
                        <div class="form-group">
                            <label for="subject">Betreff:</label>
                            <input type="text" id="subject" placeholder="z.B. Anfrage" required>
                        </div>
                        <div class="form-group">
                            <label for="complaint">Beschwerdetext:</label>
                            <textarea id="complaint" placeholder="Anfrage beschreiben" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="file">Datei-Upload für Bilder:</label>
                            <input type="file" id="file" accept=".jpg, .png" required>
                        </div>
                        <div class="form-group">
                            <button type="submit">Absenden</button>
                        </div>
                    </form>

                    <script>
                        const contactForm = document.getElementById('contactForm');
                        contactForm.addEventListener('submit', function (event) {
                            event.preventDefault();
                            if (validateForm()) {
                                // Formular absenden
                                contactForm.submit();
                            }
                        });

                        function validateForm() {
                            let isValid = true;

                            const firstName = document.getElementById('firstName').value;
                            const lastName = document.getElementById('lastName').value;
                            const email = document.getElementById('email').value;
                            const phone = document.getElementById('phone').value;
                            const subject = document.getElementById('subject').value;
                            const complaint = document.getElementById('complaint').value;
                            const file = document.getElementById('file').files[0];

                            // Validierung der Pflichtfelder
                            if (firstName.trim() === '') {
                                isValid = false;
                                document.getElementById('firstName').classList.add('error');
                            } else {
                                document.getElementById('firstName').classList.remove('error');
                            }

                            if (lastName.trim() === '') {
                                isValid = false;
                                document.getElementById('lastName').classList.add('error');
                            } else {
                                document.getElementById('lastName').classList.remove('error');
                            }

                            if (email.trim() === '' || !validateEmail(email)) {
                                isValid = false;
                                document.getElementById('email').classList.add('error');
                            } else {
                                document.getElementById('email').classList.remove('error');
                            }

                            if (subject.trim() === '') {
                                isValid = false;
                                document.getElementById('subject').classList.add('error');
                            } else {
                                document.getElementById('subject').classList.remove('error');
                            }

                            if (complaint.trim() === '') {
                                isValid = false;
                                document.getElementById('complaint').classList.add('error');
                            } else {
                                document.getElementById('complaint').classList.remove('error');
                            }

                            // Validierung der E-Mail-Adresse
                            function validateEmail(email) {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return emailRegex.test(email);
                            }

                            // Validierung des Datei-Uploads
                            if (file) {
                                const fileSize = file.size;
                                const fileType = file.type;

                                if (fileSize > 5 * 1024 * 1024) {
                                    isValid = false;
                                    document.getElementById('file').classList.add('error');
                                } else if (!['image/jpeg', 'image/png'].includes(fileType)) {
                                    isValid = false;
                                    document.getElementById('file').classList.add('error');
                                } else {
                                    document.getElementById('file').classList.remove('error');
                                }
                            }

                            return isValid;
                        }
                    </script>
                </body>

                </html>' > /var/www/html/index.html
                busybox httpd -f -p 80 -h /var/www/html &
                EOT
}

#S3 Bucket
resource "aws_s3_bucket" "bildeimer-schrauben" {
  bucket = "bildeimer-schrauben"
}

#DynamoDB
resource "aws_dynamodb_table" "dino" {
    name = "dino"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "id"
  attribute {
    name = "id"
    type = "N"
  }
    tags = {
        Name = "Userdaten"
    }
}
#IAM ROle and Policy
resource "aws_iam_role" "s3_access_role" {
    name = "s3_access_role"
    
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [{
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
            Service = "ec2.amazonaws.com"
        }
        }]
        })
}

resource "aws_iam_policy" "s3_access_policy" {
    name = "s3_access_policy"
    
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [{
        Action = ["s3:GetObject", "s3:ListBucket","s3:PutObject","s3:DeleteObject"],
        Effect = "Allow",
        Resource = [
            aws_s3_bucket.bildeimer-schrauben.arn,
            "${aws_s3_bucket.bildeimer-schrauben.arn}/*"
        ]
        }
        ]
        })
}

resource "aws_iam_role_policy_attachment" "s3_access_attach" {
    policy_arn = aws_iam_policy.s3_access_policy.arn
    role       = aws_iam_role.s3_access_role.name
}



locals {
    lb_parts = split("/", aws_lb.web_alb.arn)
    lb_id    = local.lb_parts[length(local.lb_parts) - 1]
    lb_name  = aws_lb.web_alb.name
}

# Auto Scaling Policy for Scale Up
resource "aws_autoscaling_policy" "scale_up" {
    name                   = "scale-up-policy"
    adjustment_type        = "ChangeInCapacity"
    scaling_adjustment     = 1
    cooldown               = 600
    autoscaling_group_name = aws_autoscaling_group.web_asg.name
}

# Auto Scaling Policy for Scale Down
resource "aws_autoscaling_policy" "scale_down" {
    name                   = "scale-down-policy"
    adjustment_type        = "ChangeInCapacity"
    scaling_adjustment     = -1
    cooldown               = 600
    autoscaling_group_name = aws_autoscaling_group.web_asg.name
}

# CloudWatch Metric Alarm to scale up
resource "aws_cloudwatch_metric_alarm" "scale_up" {
    alarm_name          = "scale-up-on-high-requests"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods  = "1"
    metric_name         = "RequestCount"
    namespace           = "AWS/ApplicationELB"
    period              = "60"
    statistic           = "Sum"
    threshold           = "1" # Modify this value based on when you want to scale up
    alarm_description   = "This metric triggers when there are too many requests on the ALB"
    alarm_actions       = [aws_autoscaling_policy.scale_up.arn]
    dimensions          ={
        LoadBalancer      ="app/${local.lb_name}/${local.lb_id}"
        AvailabilityZone ="eu-central-1a"
    }
}
#Zugriffsrechte für ec2 auf dynamoDB
resource "aws_iam_policy" "dynamodb_access_policy" {
    name        = "dynamodb_access_policy"
    description = "Zugriff auf DynamoDB-Ressourcen"
    
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
        {
            Action = [
            "dynamodb:DescribeTable",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
            "dynamodb:Query",
            "dynamodb:Scan"
            ],
            Effect   = "Allow",
            Resource = "arn:aws:dynamodb:eu-central-1:519140765420:table/Dino"
        }
        ]
    })
}
resource "aws_iam_policy_attachment" "dynamodb_access_attach" {
    name       = "dynamodb_access_attach"
    policy_arn = aws_iam_policy.dynamodb_access_policy.arn
    roles      = [aws_iam_role.s3_access_role.name]
}






# output ALB DNS name
output "alb_dns_name" {
    value = aws_lb.web_alb.dns_name
}
# output "dynamodb_endpoint" {
#     value = aws_dynamodb_table.dino.endpoint
# }
